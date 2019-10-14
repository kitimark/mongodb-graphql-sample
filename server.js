import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import schema from './modules/rootSchema'
import {
  graphqlExpress,
  graphiqlExpress
} from 'graphql-server-express'
import {
  NODE_PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME
} from './config'

const server = express()

server.get('/', (req, res) => {
  res.send(`Server in now running on http://localhost:${NODE_PORT}`)
})

server.use('/graphql', bodyParser.json(), graphqlExpress(req => ({ schema })))

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

server.listen(NODE_PORT, () => console.log(`Server is now running on http://localhost:${NODE_PORT}`))

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)

// Connection MongoDB URL
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(`DB Connected on ${DB_HOST}:${DB_PORT}/${DB_NAME}`)
})