import mongoose from 'mongoose';

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

// Create a User Model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;