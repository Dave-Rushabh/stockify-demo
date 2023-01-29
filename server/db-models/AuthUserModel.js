import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//prepare schema for a model
const userModel = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
});

// initialize the above model with mongoose
const User = mongoose.model('user', userModel);

export { User };
