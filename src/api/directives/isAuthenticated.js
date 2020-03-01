const {  SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

export class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
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

// export default {
//   typeDef,
//   IsAuthenticatedDirective
// }

// export default {
//   typeDef,
//   directive: IsAuthenticatedDirective
// }
