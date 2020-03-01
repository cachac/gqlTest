import { AuthenticationError /* ,UserInputError */ } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Model from '../model'

export const login = async (_, { input }) => {
  const user = await Model.findOne({ email: input.email })
  if (!user) throw new AuthenticationError('User not found')
  const isPasswordValid = bcrypt.compareSync(input.password, user.password)
  if (!isPasswordValid) throw new AuthenticationError('Invalid email or password')
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name
    },
    'SECRET',
    { expiresIn: '30D' }
  )
  return { token }
}
