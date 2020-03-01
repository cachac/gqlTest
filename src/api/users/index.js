import { gql } from 'apollo-server-express'
import resolvers from './resolvers'

const typeDefs = gql`
  extend type Query {
    users: [User!]
    user(_id: ID!): User
  }

  extend type Mutation {
    signup(input: signupInput): User
    login(input: loginInput): Token
  }

  type User {
    id: ID
    name: String
    email: String
    tasks: [Task!]
    createdAt: Date!
    updatedAt: Date!
  }

  type Token {
    token: String!
  }

  input signupInput {
    name: String!
    email: String!
    password: String!
  }

  input loginInput {
    email: String!
    password: String!
  }
`

export default {
  typeDefs,
  resolvers
}
