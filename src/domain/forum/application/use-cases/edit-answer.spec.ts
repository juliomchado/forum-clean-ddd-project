import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { EditAnswerUseCase } from "./edit-answer";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a answer", async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-id"),
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: "author-id",
      content: "edited content",
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "edited content",
    });
    expect(inMemoryAnswersRepository.items).toHaveLength(1);
  });

  it("should not be able to edit a answer from another user", async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-id-1"),
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      answerId: "answer-1",
      authorId: "author-id-2",
      content: "edited content",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
