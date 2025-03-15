import express from 'express';
import { loginUsers, signupUser } from '../controllers/authController.js';

const authrouter = express.Router();

// Define routes
authrouter.post('/login', loginUsers); // login user
authrouter.post('/signup', signupUser); // signup user

// Export the router
export default authrouter;
