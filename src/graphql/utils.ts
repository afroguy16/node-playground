import { GraphQLError } from "graphql";

export const createGraphQLErrorObject = (message, errors, code?) => {
  const errorExtensions = { status: false, errors, code };
  return new GraphQLError(
    message,
    null,
    null,
    null,
    null,
    null,
    errorExtensions
  );
};
