import taskModel from '../../tasks/model'

// User resolver
export default {
  tasks: ({ id }) => taskModel.find(task => task.userId === id)
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
