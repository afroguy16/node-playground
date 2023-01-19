import { buildSchema } from "graphql";

export default buildSchema(`
  type ErrorResponse {
    path: String!
    message: String!
  }

  type Product {
    _id: String!
    userId: String!
    title: String!
    imageUrl: String!
    description: String!
    price: Int!
  }

  type ProductsData {
    currentPage: Int!
    pageCount: Int!
    products: [Product]!
  }

  type WriteResponse {
    status: Boolean
    message: String
  }

  input SignupInputData {
    username: String
    email: String!
    password: String!
    confirmPassword: String!
  }

  type RootQuery {
    products(page: Int!): ProductsData!
  }

  type Mutation {
    signup(signupInputData: SignupInputData): WriteResponse!
    addProduct(title: String!, description: String!, price: Int!): WriteResponse!
    editProduct(id: String!, title: String, description: String, price: Int): WriteResponse!
  }

  schema {
    query: RootQuery
    mutation: Mutation
  }
`);
