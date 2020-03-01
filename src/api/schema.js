import { gql, makeExecutableSchema, SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express'
// import directives from './directives'

import users from './users'
import tasks from './tasks'

const { defaultFieldResolver } = require('graphql')

const globalTypeDefs = gql`
  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    REVIEWER
    USER
  }

  scalar Date
  type Query
  type Mutation
`

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  // eslint-disable-next-line class-methods-use-this
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async function(...args) {
      const context = args[2]

      console.log(`directive: ${context.userSession}`)
      if (!context || !context.userSession) {
        throw new AuthenticationError('Not allowed')
      }

      return resolve.apply(this, args)
    }
  }
}
export default makeExecutableSchema({
  typeDefs: [globalTypeDefs, users.typeDefs, tasks.typeDefs],
  resolvers: [users.resolvers, tasks.resolvers],
  schemaDirectives: {
    isAuth: IsAuthenticatedDirective
  }
})
