import { graphqlHTTP } from "express-graphql";
import resolvers from "./resolvers";
import schemas from "./schemas";

export default graphqlHTTP({
  schema: schemas,
  rootValue: resolvers,
  customFormatErrorFn: (error) => ({
    message: error.message || "Something went wrong",
    status: error.extensions.status,
    errors: error.extensions.errors,
    code: error.extensions.code || 500,
  }),
});
