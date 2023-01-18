import { buildSchema } from "graphql";

export default buildSchema(`
  type ErrorResponse {
    path: String!
    message: String!
  }

  type WriteResponse {
    status: Boolean
    message: String
    errors: [ErrorResponse]
  }

  input SignupInputData {
    username: String
    email: String!
    password: String!
    confirmPassword: String!
  }

  type RootQuery {
    hello: String
  }

  type Mutation {
    signup(signupInputData: SignupInputData): WriteResponse!
  }

  schema {
    query: RootQuery
    mutation: Mutation
  }
`);