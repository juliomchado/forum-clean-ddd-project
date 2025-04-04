import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {}
>;

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findById(
      questionCommentId
    );

    if (!questionComment) {
      return left(new ResourceNotFoundError());
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionCommentsRepository.delete(questionComment);

    return right({});
  }
}
