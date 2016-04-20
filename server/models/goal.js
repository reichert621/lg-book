import mongoose from 'mongoose'

const goalSchema = new mongoose.Schema({
  text: String,
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
});

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;
