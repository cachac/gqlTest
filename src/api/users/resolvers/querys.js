// import { combineResolvers } from 'graphql-resolvers'
import Model from '../model'
// import taskModel from '../../tasks/model'
// import { isAuthenticated } from '../../middlewares/resolver'

export const users = () => Model.find({})
// eslint-disable-next-line no-shadow
export const user = (_, { id } /* { userSession } */) =>
  // if (!user) throw new AuthenticationError('Access Denied, please login to continue')
  Model.findById(id)
