import { GraphQLError } from "graphql";
import { createGraphQLErrorObject } from "../utils";

// jest.mock('graphql')

describe("createGraphQLErrorObject", () => {
  it("should return a Graphql error instance", () => {
    const message = "Fake message";
    const errors = [{ fake: "any shape works" }];
    const code = 411;

    const extentions = { status: false, errors, code };
    const errorsObject = createGraphQLErrorObject(message, errors, code);

    expect(errorsObject).toBeInstanceOf(GraphQLError);
    expect(errorsObject).toHaveProperty("message", message);
    expect(errorsObject).toHaveProperty("extensions", extentions);
  });
});
