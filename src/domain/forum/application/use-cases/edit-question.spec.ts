import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { EditQuestionUseCase } from "./edit-question";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityID("author-id"),
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(question);

    await sut.execute({
      questionId: question.id.toString(),
      authorId: "author-id",
      content: "edited content",
      title: "edited title",
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      content: "edited content",
      title: "edited title",
    });
    expect(inMemoryQuestionsRepository.items).toHaveLength(1);
  });

  it("should not be able to edit a question from another user", async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityID("author-id-1"),
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(question);

    const result = await sut.execute({
      questionId: "question-1",
      authorId: "author-id-2",
      content: "edited content",
      title: "edited title",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
