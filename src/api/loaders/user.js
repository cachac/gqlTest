import User from '../users/model'

export default {
  batchUsers: async userIds => {
    console.log('keys====', userIds)
    const users = await User.find({ _id: { $in: userIds } })
    return userIds.map(userId => users.find(user => user.id === userId))
  }
}
