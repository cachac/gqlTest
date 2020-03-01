import { gql, makeExecutableSchema } from 'apollo-server-express'
import directives from './directives'
import users from './users'
import tasks from './tasks'

const globalTypeDefs = gql`
  scalar Date
  type Query
  type Mutation
`

export default makeExecutableSchema({
  typeDefs: [globalTypeDefs, directives.typeDefs, users.typeDefs, tasks.typeDefs],
  resolvers: [users.resolvers, tasks.resolvers],
  schemaDirectives: {
    isAuth: directives.IsAuthenticatedDirective
  }
})
