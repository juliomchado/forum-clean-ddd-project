import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeQuestionComment } from "test/factories/make-question-comment";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete comment on question", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to delete comment on question", async () => {
    const questionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(questionComment);

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete comment on question", async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID("author-id-1"),
    });

    await inMemoryQuestionCommentsRepository.create(questionComment);

    await expect(
      sut.execute({
        authorId: "author-id-2",
        questionCommentId: questionComment.id.toString(),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
