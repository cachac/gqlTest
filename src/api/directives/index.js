// import isAuthenticated from './isAuthenticated'
import { gql } from 'apollo-server-express'
import { IsAuthenticatedDirective } from './isAuthenticated'

export const typeDefs = gql`
  directive @isAuthenticated on OBJECT | FIELD_DEFINITION
`

export default {
  typeDefs,
  IsAuthenticatedDirective
}

// export default {
//   typeDefs: [isAuthenticated.typeDef],
//   schemaDirectives: {
//     isAuthenticated: isAuthenticated.directive
//   }
// }
