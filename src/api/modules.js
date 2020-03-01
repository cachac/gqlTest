import { makeExecutableSchemaFromModules } from '../helper/modules'
// const auth = require('./auth')
import users from './users'

export default {
  makeExecutableSchemaFromModules({
    modules: [users]
  })
}
