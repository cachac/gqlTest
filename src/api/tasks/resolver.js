import Model from './model'
import userModel from '../users/model'

export default {
  Query: {
    tasks: () => Model.find({}),
    task: (_, { id }) => Model.findOne({ id })
  },
  Task: {
    // user: ({ userId }) => userModel.findOne({ _id: userId }),
    name: ({ name }) => `${name}->testing` // overrides every prop 'name' in each resolver
  },
  Mutation: {
    createTask: async (_, { input }, { userSession }) => {
      const user = await userModel.findOne({ email: userSession.email })
      const newTask = new Model({ ...input, user: user.id })
      await newTask.populate('user').execPopulate()
      return newTask.save()
      // user.tasks.push(result.id)
      // await user.save()
      // return result
    }
  }
}
