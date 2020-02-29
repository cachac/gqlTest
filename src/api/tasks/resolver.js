import Model from './model'
import userModel from '../users/model'

export default {
  Query: {
    tasks: () => Model.find({}),
    task: (_, { _id }) => Model.findOne({ _id })
  },
  Task: {
    user: ({ userId }) => userModel.findOne({ _id: userId }),
    name: ({ name }) => `${name}->testing` // overrides every prop 'name' in each resolver
  },
  Mutation: {
    createTask: (_, { input }) => {
      Model.push(input)
      return input
    }
  }
}
