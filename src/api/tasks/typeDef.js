import { gql } from 'apollo-server-express'

export default gql`
  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }

  extend type Query {
    tasks: [Task!]
    task(id: ID!): Task
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
