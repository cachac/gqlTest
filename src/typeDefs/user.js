import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID
    name: String
    email: String
    tasks: [Task]
  }

  extend type Query {
    users: [User!]
    user(id: ID!): User
  }
`
