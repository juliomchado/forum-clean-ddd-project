import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { CreateAnswerUseCase } from "./create-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: CreateAnswerUseCase;

describe("Create answers question ", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new CreateAnswerUseCase(inMemoryAnswersRepository);
  });

  test("should be able to create a question", async () => {
    const { answer } = await sut.execute({
      questionId: "1",
      instructorId: "1",
      content: "Conteúdo da resposta",
    });

    expect(answer.id).toBeTruthy();
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
  });
});
