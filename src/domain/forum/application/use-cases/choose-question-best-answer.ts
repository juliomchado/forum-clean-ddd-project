import { UniqueEntityID } from "@/core/entities/unique-entitiy-id";
import { AnswersRepository } from "../repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/question-repository";

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }
    const question = await this.questionsRepository.findById(
      answer.questionId.toValue()
    );

    if (!question) {
      throw new Error("Question not found");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    question.bestAnswerId = answer.id;

    await this.answersRepository.save(answer);

    return { question };
  }
}
