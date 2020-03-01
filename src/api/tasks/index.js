import { gql } from 'apollo-server-express'
import resolvers from './resolver'

const typeDefs = gql`
  extend type Query {
    tasks: [Task!]
    tasksByUser: [Task!]
    task(id: ID!): Task
  }

  extend type Mutation {
    create(input: taskInput!): Task
    update(id: ID!, input: taskInput!): Task
    delete(id: ID!): Task
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
