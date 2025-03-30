import { Either, right } from "./../../../../core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswersRepository } from "../repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";

interface CreateAnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

type CreateAnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

export class CreateCreateAnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: CreateAnswerQuestionUseCaseRequest): Promise<CreateAnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    await this.answersRepository.create(answer);

    return right({
      answer,
    });
  }
}
