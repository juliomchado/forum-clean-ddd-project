import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswersRepository } from "../repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";

interface AnswerUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

interface AnswerUseCaseResponse {
  answer: Answer;
}

export class CreateAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerUseCaseRequest): Promise<AnswerUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    await this.answersRepository.create(answer);

    return { answer };
  }
}
