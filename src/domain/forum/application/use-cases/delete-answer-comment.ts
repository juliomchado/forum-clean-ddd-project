import { Either } from "./../../../../core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { left, right } from "@/core/either";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId
    );

    if (!answerComment) {
      return left("Answer not found.");
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left("Not allowed.");
    }

    await this.answerCommentsRepository.delete(answerComment);

    return right({});
  }
}
