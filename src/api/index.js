import { gql } from 'apollo-server-express'
import userTypeDefs from './users/typeDef'
import taskTypeDefs from './tasks/typeDef'

const typeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`
export default [typeDefs, userTypeDefs, taskTypeDefs]
