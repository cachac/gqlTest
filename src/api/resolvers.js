import { GraphQLDateTime } from 'graphql-iso-date'
import taskResolver from './tasks/resolver'
import userResolver from './users/resolver'

const customDateScalarResolver = {
  Date: GraphQLDateTime
}

export default [taskResolver, userResolver, customDateScalarResolver]
