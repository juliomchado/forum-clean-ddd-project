import { Either, left, right } from "./either";

function doSomething(isSucess: boolean): Either<string, number> {
  if (isSucess) {
    return right(10);
  } else {
    return left("error");
  }
}

test("success result doSomething function", () => {
  const successResult = doSomething(true);

  if (successResult.isRight()) {
    expect(successResult.value).toBeTypeOf("number");
  }

  expect(successResult.isRight()).toBe(true);
  expect(successResult.isLeft()).toBe(false);
});

test("error result doSomething function", () => {
  const successResult = doSomething(false);

  expect(successResult.isRight()).toBe(false);
  expect(successResult.isLeft()).toBe(true);
});

test("success result", () => {
  const success = right("success");

  expect(success.value).toEqual("success");
});

test("error result", () => {
  const error = left("error");

  expect(error.value).toEqual("error");
});
