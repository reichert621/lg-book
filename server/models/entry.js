import mongoose from 'mongoose'

const promptSchema = new mongoose.Schema({
  question: String,
  answer: String
})

const goalSchema = new mongoose.Schema({
  text: String,
  finished: Boolean
})

const entrySchema = new mongoose.Schema({
  text: String,
  title: String,
  date: String,
  _date: Date,
  prompts: [promptSchema],
  goals: [goalSchema],
  createdAt: Date,
  updatedAt: Date
})

const Entry = mongoose.model('Entry', entrySchema)

export default Entry
