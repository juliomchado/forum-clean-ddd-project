import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { UniqueEntityID } from "@/core/entities/unique-entitiy-id";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeQuestion } from "test/factories/make-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose question best answer ", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository
    );
  });

  it("should be able to choose the question best answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer(
      {
        questionId: question.id,
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(answer);
    await inMemoryQuestionsRepository.create(question);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      answer.id
    );
  });

  it("should not be able to choose another user question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID("author-wrong-id"),
    });
    const answer = makeAnswer(
      {
        questionId: question.id,
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(answer);
    await inMemoryQuestionsRepository.create(question);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });
    await expect(
      sut.execute({
        answerId: "answer-1",
        authorId: "author-id",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
