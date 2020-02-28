import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import dotEnv from 'dotenv'
import resolvers from './api/resolvers'
import typeDefs from './api'

const app = express()
app.use(cors())
app.use(express.json())

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})
apolloServer.applyMiddleware({ app, path: '/graphql' })

dotEnv.config()
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server UP! ${PORT}`)
  console.log(`endpoint:  ${apolloServer.graphqlPath}`)
})

// basic query
/*
query {
  tasks{
    id
    name
    user {
      email
    }
  }
}
*/

/* using field level resolver
query {
  tasks{
    id
    name
    completed
    user{
      id
      name
    }
  }
}
*/

/* get task by id
query {
  task(id: 2) {
    id
    name
    user {
      email
    }
  }
}
*/

/* get list of users and its tasks
query {
  users {
    id
    name
    email
    tasks {
      name
    }
  }
}
*/

/* get user by id
query {
  user(id: 1) {
    id
    name
    email
    tasks {
      name
    }
  }
}
*/

/* mutation - create task
mutation createTask {
  createTask(input: { id: 5, name: "new task 5", completed: false, userId: 2 }) 
  {
    id
    name
  }
}
*/
