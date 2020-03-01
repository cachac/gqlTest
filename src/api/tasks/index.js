import { gql } from 'apollo-server-express'
import resolvers from './resolver'

const typeDefs = gql`
  extend type Query {
    tasks(cursor: String, limit: Int): [Task!] @isAuth
    tasksByUser: [Task!] @isAuth
    task(id: ID!): Task @isAuth
  }

  extend type Mutation {
    create(input: taskInput!): Task @isAuth
    update(id: ID!, input: taskInput!): Task @isAuth
    delete(id: ID!): Task @isAuth
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
