import { AuthenticationError /* ,UserInputError */ } from 'apollo-server-express'
// import { combineResolvers } from 'graphql-resolvers'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Model from './model'
import taskModel from '../tasks/model'
// import { isAuthenticated } from '../../middlewares/resolver'

export default {
  Query: {
    users: () => Model.find({}),
    user: (_, { _id }, { user }) => {
      console.log('context: ', user)
      // if (!user) throw new AuthenticationError('Access Denied, please login to continue')
      return Model.findOne({ _id })
    }
  },
  User: {
    tasks: ({ id }) => taskModel.filter(task => task.userId === id)
  },
  Mutation: {
    signup: async (_, { input }) => {
      const email = await Model.findOne({ email: input.email })
      if (email) throw new Error('Email already in use')
      const hashedPassword = bcrypt.hashSync(input.password, 12)
      const newUser = new Model({ ...input, password: hashedPassword })
      return newUser.save()
    },
    login: async (_, { input }) => {
      const user = await Model.findOne({ email: input.email })
      if (!user) throw new AuthenticationError('User not found')
      const isPasswordValid = bcrypt.compareSync(input.password, user.password)
      if (!isPasswordValid) throw new AuthenticationError('Invalid email or password')
      const token = jwt.sign({ email: user.email }, 'SECRET', { expiresIn: '30D' })
      return { token }
    }
  }
}

/* create a user with unique email
mutation createUser {
  signup(input:{
    name: "Carlos"
    email:"c@fds1.c"
    password: "123"
  })
  {
    id
  }
}
*/

/* login
mutation login {
  login(input:{    
    email:"c@fds12.c"
    password: "123"
  })
  {
    token
  }
}
*/
