// import { combineResolvers } from 'graphql-resolvers'
// import { isAuthenticated } from '../../middlewares/resolver'
import Model from '../model'

export const users = () => Model.find({})
export const user = (_, { id } /* { userSession } */) =>
  // if (!user) throw new AuthenticationError('Access Denied, please login to continue')
  Model.findById(id)
