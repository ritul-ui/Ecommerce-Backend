// models/userDetailsModel.js
import mongoose from 'mongoose';

// Define the User Details Schema
const userDetailsSchema = new mongoose.Schema({
  profileData: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true , unique: true}, // Reference to the User model
  profilePic: { type: String },
  address: { type: String },
  personalDetails: { type: Object }
});

// Create a UserDetails Model
const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

export default UserDetails; // Export the UserDetails model


