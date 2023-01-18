import { graphqlHTTP } from "express-graphql";
import resolvers from "./resolvers";
import schemas from "./schemas";

export default graphqlHTTP({
  schema: schemas,
  rootValue: resolvers,
  graphiql: true,
});
