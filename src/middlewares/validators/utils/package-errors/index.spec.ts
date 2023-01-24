import packageErrors from ".";
import {
  ERROR_EMPTY_ERRORS,
  ERROR_EMPTY_PATH,
  ERROR_EMPTY_PATH_AND_ERRORS,
} from "./constants";

describe("Package Errors Utililty", () => {
  it("should return an empty array if path and errors array is empty", () => {
    expect(() => packageErrors("", [])).toThrowError(
      ERROR_EMPTY_PATH_AND_ERRORS
    );
  });

  it("should return an empty array if path is empty", () => {
    expect(() => packageErrors("", ["some random error message"])).toThrowError(
      ERROR_EMPTY_PATH
    );
  });

  it("should return an empty array if the errors array empty", () => {
    expect(() => packageErrors("fakePath", [])).toThrowError(
      ERROR_EMPTY_ERRORS
    );
  });

  it("should return a packaged error if path is given and the errors array has one error", () => {
    const path = "fakePath";
    const message = "fakeMessage";
    expect(packageErrors(path, [message])).toStrictEqual([{ path, message }]);
  });

  it("should return a packaged error if path is given and the errors array has multiple errors", () => {
    const path = "fakePath";
    const message1 = "fakeMessage1";
    const message2 = "fakeMessage2";

    expect(packageErrors(path, [message1, message2])).toStrictEqual([
      { path, message: message1 },
      { path, message: message2 },
    ]);
  });
});
