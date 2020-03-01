import Model from './model'

export default {
  Query: {
    tasks: () => Model.find({}).populate('user'),
    tasksByUser: (_, __, { userSession }) => Model.find({ user: userSession.id }).populate('user'),
    task: (_, { id }) => Model.findById(id).populate('user')
  },
  Task: {
    name: ({ name }) => `${name}->testing` // overrides every prop 'name' in each resolver
  },
  Mutation: {
    create: async (_, { input }, { userSession }) => {
      const newTask = new Model({ ...input, user: userSession.id })
      await newTask.populate('user').execPopulate()
      return newTask.save()
    },
    update: async (_, { id, input }) => Model.findByIdAndUpdate(id, { ...input }, { new: true }).populate('user'),
    delete: async (_, { id }) => Model.findByIdAndDelete(id).populate('user')
  }
}

/*
mutation createTask {
  create(input: { name: "USER TASK 2", completed: false }) {
    id
    name
  }
}


mutation updateTask {
  update(id: "5e5b5dc1f29bde4e696ddd62", 
    input: { 
      name: "UPDATED TO COMPLETE", completed: true }) 
  {
    id
    name
  }
}

mutation deleteTask {
  delete(id: "5e5b3979b5941b1f7081b677") 
  {
    id
    name
  }
}
*/
