import { AuthenticationError /* ,UserInputError */ } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Model from '../model'

export const login = async (_, { input }) => {
  const user = await Model.findOne({ email: input.email })
  if (!user) throw new AuthenticationError('User not found')
  const isPasswordValid = bcrypt.compareSync(input.password, user.password)
  if (!isPasswordValid) throw new AuthenticationError('Invalid email or password')
  const token = jwt.sign({ email: user.email }, 'SECRET', { expiresIn: '30D' })
  return { token }
}
