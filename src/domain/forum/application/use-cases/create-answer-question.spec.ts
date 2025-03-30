import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { CreateCreateAnswerQuestionUseCase } from "./create-answer-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: CreateCreateAnswerQuestionUseCase;

describe("Create answers question ", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new CreateCreateAnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      questionId: "1",
      instructorId: "1",
      content: "Conteúdo da resposta",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
  });
});
