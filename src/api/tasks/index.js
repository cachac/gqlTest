import { gql } from 'apollo-server-express'
import resolvers from './resolver'

const typeDefs = gql`
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
    name: String!
    completed: Boolean!
  }

  extend type Mutation {
    createTask(input: taskInput!): Task
  }
`
export default {
  typeDefs,
  resolvers
}
