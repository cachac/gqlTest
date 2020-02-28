import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import cors from 'cors'
import dotEnv from 'dotenv'

const app = express()
app.use(cors())
app.use(express.json())

const typeDefs = gql`
  type Query {
    tasks: [Task!]
  }

  type User {
    id: ID
    name: String
    email: String
    tasks: [Task]
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }
`
const resolvers = {
  Query: {
    tasks: () => [
      {
        id: '1',
        name: 'mi tarea 01',
        completed: true,
        userId: '1'
      },
      {
        id: '2',
        name: 'mi tarea 02',
        completed: false,
        userId: '1'
      }
    ]
  },
  Task: {
    user: ({ userId }) =>
      [
        {
          id: '1',
          name: 'mi usuario 1',
          email: 'email_1@domain.com'
        },
        {
          id: '2',
          name: 'mi usuario 2',
          email: 'email_2@domain.com'
        }
      ].find(u => u.id === userId),
    name: ({ name }) => `${name}->testing` // overrides every prop 'name' in each resolver
  }
}

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
