import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entitiy-id";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID
) {
  const answer = Answer.create(
    {
      content: faker.lorem.text(),
      questionId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      ...override,
    },
    id
  );

  return answer;
}
