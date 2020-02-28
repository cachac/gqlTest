import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import cors from 'cors'
import dotEnv from 'dotenv'

const app = express()
app.use(cors())
app.use(express.json())

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task!]
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User
  }
`
const resolvers = {
  Query: {}
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
