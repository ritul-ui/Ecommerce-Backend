import express from 'express';
import {getUserDetails, postUserDetails, updateUserDetails } from '../controllers/userDetailsController.js';
import middleware from '../middleware/requirelogin.js';

const userdetailrouter = express.Router();

// Route to get user details by ID
userdetailrouter.get('/', middleware, getUserDetails);

// Route to add new user details
userdetailrouter.post('/', middleware, postUserDetails);

// Route to update user details by ID
userdetailrouter.put('/', middleware,  updateUserDetails); //changed

export default userdetailrouter;