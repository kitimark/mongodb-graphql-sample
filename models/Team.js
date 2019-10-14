import mongoose from 'mongoose'

const Schema = mongoose.Schema
const teamSchema = new Schema({
  fullname: { type: String, required: true },
  shortname: { type: String, required: true, index: true },
  nickname: { type: String },
  founded: { type: String },
  stadium: { type: String},
  capacity: { type: Number },
  owner: { type: String },
  manager: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
},
{
  timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

const Team = mongoose.model('teams', teamSchema, 'teams')

export default Team