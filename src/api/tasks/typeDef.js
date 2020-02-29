import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    tasks: [Task!]
    task(_id: ID!): Task
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }

  input taskInput {
    id: ID!
    name: String!
    completed: Boolean!
    userId: ID!
  }

  extend type Mutation {
    createTask(input: taskInput!): Task
  }
`
