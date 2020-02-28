import { gql } from 'apollo-server-express'
import userTypeDefs from './user'
import taskTypeDefs from './task'

const typeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`
export default [typeDefs, userTypeDefs, taskTypeDefs]
