import { pubsub } from '../../subscription'
import userEvents from '../../subscription/events'
import { user, users } from './querys'
import { signup } from './signup'
import { login } from './login'
import { User } from './user'

export default {
  Query: {
    users,
    user
  },
  Mutation: {
    signup,
    login
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator(userEvents.userEvents.USER_CREATED)
    }
  },
  User
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
