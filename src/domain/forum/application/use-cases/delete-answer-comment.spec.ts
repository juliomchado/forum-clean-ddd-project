import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete comment on answer", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to delete comment on answer", async () => {
    const answerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete comment on answer", async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID("author-id-1"),
    });

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await expect(
      sut.execute({
        authorId: "author-id-2",
        answerCommentId: answerComment.id.toString(),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
