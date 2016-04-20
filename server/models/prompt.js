import mongoose from 'mongoose'

const promptSchema = new mongoose.Schema({
  text: String,
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
});

const Prompt = mongoose.model('Prompt', promptSchema);

export default Prompt;
