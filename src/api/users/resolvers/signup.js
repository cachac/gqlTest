import { UserInputError } from 'apollo-server-express'
import bcrypt from 'bcryptjs'
import { pubsub } from '../../subscription'
import events from '../../subscription/events'
import Model from '../model'

export const signup = async (_, { input }) => {
  const email = await Model.findOne({ email: input.email })
  if (email) throw new UserInputError('Email already in use')
  const hashedPassword = bcrypt.hashSync(input.password, 12)
  const newUser = new Model({ ...input, password: hashedPassword })
  const result = await newUser.save()
  pubsub.publish(events.USER_CREATED, {
    userCreated: result
  })
  return result
}
