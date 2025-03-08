import express from 'express';
import { getAllUsers, addUser } from '../controllers/userController.js';

const userRouter = express.Router();

// Define routes
userRouter.get('/', getAllUsers); // GET all users
userRouter.post('/', addUser); // POST a new user

// Export the router
export default userRouter;

