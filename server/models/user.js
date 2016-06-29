import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  question: String,
  type: String,
  pending: Boolean
})

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  facebookId: String,
  conversation: {
    dateId: String,
    questions: [questionSchema]
  }
})

const User = mongoose.model('User', userSchema)

export default User
