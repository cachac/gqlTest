import { ApolloServer } from 'apollo-server-express'
import schema from './api/schema'
import context from './helper/context'

export const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    userSession: await context.verifyUser(req)
  }),
  formatError: err => {
    console.log('>> error', err.message)
    // if production return only message
    // return err.message
    return err
  }
})
