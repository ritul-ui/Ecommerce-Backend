import express from 'express';
import {getUserDetails, postUserDetails, updateUserDetails } from '../controllers/userDetailsController.js';

const userdetailrouter = express.Router();

// Route to get user details by ID
userdetailrouter.get('/:id', getUserDetails);

// Route to add new user details
userdetailrouter.post('/', postUserDetails);

// Route to update user details by ID
userdetailrouter.put('/:id', updateUserDetails);

export default userdetailrouter;