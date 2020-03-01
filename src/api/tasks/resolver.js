import Model from './model'
import userModel from '../users/model'

export default {
  Query: {
    tasks: () => Model.find({}),
    tasksByUser: (_, __, { userSession }) => Model.find({ user: userSession.id }),
    task: (_, { id }) => Model.findById(id)
  },
  Task: {
    user: ({ user }) => userModel.findById(user),
    name: ({ name }) => `${name}->testing` // overrides every prop 'name' in each resolver
  },
  Mutation: {
    createTask: async (_, { input }, { userSession }) => {
      // const user = await userModel.findOne({ id: userSession.id })
      console.log(`user id from token: ${userSession.id}`)
      const newTask = new Model({ ...input, user: userSession.id })
      await newTask.populate('user').execPopulate()
      return newTask.save()
      // user.tasks.push(result.id)
      // await user.save()
      // return result
    }
  }
}
