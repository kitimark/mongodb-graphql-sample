import {
  getTeamService,
  createTeamService
} from './services'

const query = `
  # show football team
  teams(input: SearchTeamInput): TeamsPayload
`

const mutation = `
  # create football team
  createTeam(input: CreateTeamInput!): TeamsPayload
`

const typeDefinitions = `
  # input of search team
  input SearchTeamInput {
    keyword: String
    per_page: Int
    current_page: Int
  }

  # input of create football team 
  input CreateTeamInput {
    team: TeamData
  }

  # input of football team information
  input TeamData {
    fullname: String! # ! is require field
    shortname: String!
    nickname: String
    founded: String
    stadium: String
    capacity: Int
    owner: String
    manager: String
  }

  # show list of football team
  type TeamsPayload {
    meta: Meta
    data: [Team] # [] is list of team (array)
    errors: [Error]
  }

  # show information of football team
  type Team {
    _id: ID
    fullname: String
    shortname: String
    nickname: String
    founded: String
    stadium: String
    capacity: Int
    owner: String
    manager: String
    created_at: String
    updated_at: String
  }

  type Meta {
    status: Int
    message: String
    total: Int
    per_page: Int
    current_page: Int
    last_page: Int
  }

  type Error {
    code: Int
    message: String
  }
`

const resolvers = {
  Query: {
    teams(root, args) {
      return new Promise((resolve, reject) => {
        getTeamService(args, data => {
          resolve(data)
        })
      })
    }
  },
  Mutation: {
    createTeam(root, args) {
      return new Promise((resolve, reject) => {
        createTeamService(args, data => {
          resolve(data)
        })
      })
    }
  }
}

export {
  query,
  typeDefinitions,
  mutation,
  resolvers
}