const { gql, SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

const typeDef = gql`
  directive @isAuthenticated on FIELD_DEFINITION
`

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  // eslint-disable-next-line class-methods-use-this
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async function(...args) {
      const context = args[2]

      if (!context || !context.user) {
        throw new AuthenticationError('Not allowed')
      }

      return resolve.apply(this, args)
    }
  }
}

export default {
  typeDef,
  directive: IsAuthenticatedDirective
}
