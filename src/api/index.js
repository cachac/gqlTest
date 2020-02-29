import { gql } from 'apollo-server-express'
import userTypeDefs from './users/typeDef'
import taskTypeDefs from './tasks/typeDef'

const globalTypeDefs = gql`
  scalar Date
  type Query
  type Mutation
`
export default [globalTypeDefs, userTypeDefs, taskTypeDefs]
