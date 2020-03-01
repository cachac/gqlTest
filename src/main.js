import express from 'express'
import throng from 'throng'
import cors from 'cors'
import config from './config'
import connection from './database'
import { apolloServer } from './gqlServer'

const app = express()
app.use(cors())
app.use(express.json())
apolloServer.applyMiddleware({ app, path: '/graphql' })

const startServer = async () => {
  app.listen(config.PORT, () => {
    console.log(`Server UP! ${config.PORT}`)
    console.log(`endpoint:  ${apolloServer.graphqlPath}`)
    connection.connect()
  })
}

// Let's make Node.js clustered for beter multi-core performance
throng(
  {
    workers: config.WORKERS,
    lifetime: Infinity
  },
  startServer
)

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
