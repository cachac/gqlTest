import dotEnv from 'dotenv'

dotEnv.config()

const { PORT = 3000, MONGODB_URI, WORKERS, JWT_LIFE_TIME = '7D', JWT_SECRET = 'SECRET' } = process.env

export default {
  PORT,
  MONGODB_URI,
  WORKERS,
  JWT_LIFE_TIME,
  JWT_SECRET
}
