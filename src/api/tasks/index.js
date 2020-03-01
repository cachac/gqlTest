import { gql } from 'apollo-server-express'
import resolvers from './resolver'

const typeDefs = gql`
  extend type Query {
    tasks: [Task!]
    tasksByUser: [Task!]
    task(id: ID!): Task
  }

  extend type Mutation {
    createTask(input: taskInput!): Task
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }

  input taskInput {
    name: String!
    completed: Boolean!
  }
`
export default {
  typeDefs,
  resolvers
}
