import bcrypt from 'bcryptjs'
import Model from './model'

const userList = [
  { id: '1', name: 'mi usuario 1', email: 'email_1@domain.com' },
  { id: '2', name: 'mi usuario 2', email: 'email_2@domain.com' }
]

const taskList = [
  { id: '1', name: 'mi tarea 01', completed: true, userId: '1' },
  { id: '2', name: 'mi tarea 02', completed: false, userId: '2' }
]

export default {
  Query: {
    users: () => userList,
    user: (_, { id }) => userList.find(user => user.id === id)
  },
  User: {
    tasks: ({ id }) => taskList.filter(task => task.userId === id)
  },
  Mutation: {
    signup: async (_, { input }) => {
      const email = await Model.findOne({ email: input.email })
      if (email) throw new Error('Email already in use')
      const hashedPassword = bcrypt.hashSync(input.password, 12)
      const newUser = new Model({ ...input, password: hashedPassword })
      return newUser.save()
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
