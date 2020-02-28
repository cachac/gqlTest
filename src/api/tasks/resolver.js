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
    tasks: () => taskList,
    task: (_, { id }) => taskList.find(task => task.id === id)
  },
  Task: {
    user: ({ userId }) => userList.find(user => user.id === userId),
    name: ({ name }) => `${name}->testing` // overrides every prop 'name' in each resolver
  },
  Mutation: {
    createTask: (_, { input }) => {
      taskList.push(input)
      return input
    }
  }
}
