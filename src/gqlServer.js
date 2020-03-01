import { ApolloServer } from 'apollo-server-express'
// import resolvers from './api/resolvers'
// import typeDefs from './api/typeDefs'
import context from './helper/context'
import schema from './api/modules' // FIXME:

export const apolloServer = new ApolloServer({
  schema, // FIXME: 
  context: async ({ req }) => ({
    user: await context.verifyUser(req)
  }),
  formatError: err => {
    console.log('>> error', err.message)
    // if production return only message
    // return err.message
    return err
  }
})
