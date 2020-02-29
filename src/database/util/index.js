import mongoose from 'mongoose'

export default {
  connect: () => {
    try {
      mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      console.log('> MongoDB Connected!')
    } catch (error) {
      console.log('> Connection Error')
      throw error
    }
  }
}
