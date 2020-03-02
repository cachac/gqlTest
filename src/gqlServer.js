import { ApolloServer } from 'apollo-server-express'
import Dataloader from 'dataloader'
import schema from './api/schema'
import context from './helper/context'
import loaders from './api/loaders'

export const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, connection }) => ({
    userSession: await context.verifyUser(req),
    loaders: {
      user: new Dataloader(keys => loaders.user.batchUsers(keys))
    }
  }),
  formatError: err => {
    console.log('>> error', err.message)
    // if production return to FrontEnd only message
    // return err.message
    return err
  }
})
