import { user, users } from './querys'
// import query from './querys'
import { signup } from './signup'
import { login } from './login'
// import User from './user'

export default {
  Query: {
    users,
    user
  },
  Mutation: {
    signup,
    login
  }
}
