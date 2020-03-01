import isAuthenticated from './isAuthenticated'

export default {
  typeDefs: [isAuthenticated.typeDef],
  schemaDirectives: {
    isAuthenticated: isAuthenticated.directive
  }
}
