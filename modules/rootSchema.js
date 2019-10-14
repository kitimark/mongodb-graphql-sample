import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash.merge'
import {
  query as teamQuery,
  resolvers as teamResolvers,
  typeDefinitions as teamTypes,
  mutation as teamMutation
} from './Team/schema'

const moduleQueries = [
  teamQuery
]

const moduleTypeDefinitions = [
  teamTypes
]

const moduleMutations = [
  teamMutation
]

const schema = `
  # root query
  type Query {
    ${moduleQueries.join('\n')}
  }

  ${moduleTypeDefinitions.join('\n')}

  # All mutation services
  type Mutation {
    ${moduleMutations.join('\n')}
  }

  # GraphQL Document 
  schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = merge(teamResolvers)
const executableSchema = makeExecutableSchema({
  typeDefs: [schema],
  resolvers
})

export default executableSchema