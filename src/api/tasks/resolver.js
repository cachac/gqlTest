import Model from './model'
// import userModel from '../users/model'
import { stringToBase64, base64ToString } from '../../helper/base64'

export default {
  Query: {
    tasks: async (_, { cursor, limit = 10 }) => {
      let task = await Model.find(cursor ? { _id: { $lt: base64ToString(cursor) } } : {})
        // .populate('user')
        .sort({ _id: -1 })
        .limit(limit + 1)
      const hasNextPage = task.length > limit
      task = hasNextPage ? task.slice(0, -1) : task
      return {
        taskFeed: task,
        pageInfo: {
          nextPageCursor: hasNextPage ? stringToBase64(task[task.length - 1].id) : null,
          hasNextPage
        }
      }
    },
    tasksByUser: (_, __, { userSession }) => Model.find({ user: userSession.id }),
    // .populate('user')
    task: (_, { id }) => Model.findById(id)
    // .populate('user')
  },
  Task: {
    // users.find({ _id: { '$in': [ ObjectId("5e5c4c5b4e35f30d016d7f21") ] } }, { projection: {} })
    user: async ({ user }, _, { loaders }) => loaders.user.load(user.toString()),
    // user: async ({ user }) => {
    //   console.log('BUSCANDO USUARIO: ', user)
    //   return userModel.findById(user)
    // },
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
