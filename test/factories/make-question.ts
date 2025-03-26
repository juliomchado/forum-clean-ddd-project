import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entitiy-id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID
) {
  const newQuestion = Question.create(
    {
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      slug: Slug.create("example-question"),
      authorId: new UniqueEntityID(),
      ...override,
    },
    id
  );

  return {
    question: newQuestion,
  };
}
