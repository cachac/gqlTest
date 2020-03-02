import mongoose from 'mongoose'
import config from '../config'

export default {
  connect: () => {
    try {
      mongoose.set('debug', true)

      mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      console.log('> MongoDB Connected!')
    } catch (error) {
      console.log('> Connection Error')
      throw error
    }
  }
}
