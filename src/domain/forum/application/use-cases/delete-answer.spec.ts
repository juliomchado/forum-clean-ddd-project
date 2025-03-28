import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { UniqueEntityID } from "@/core/entities/unique-entitiy-id";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete a answer", async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-id"),
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: "answer-1",
      authorId: "author-id",
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer from another user", async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-id-1"),
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(answer);

    await expect(
      sut.execute({
        answerId: "answer-1",
        authorId: "author-id",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
