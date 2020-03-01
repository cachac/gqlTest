import taskModel from '../../tasks/model'

export const User = {
  tasks: ({ id }) => taskModel.find({ user: id })
}
