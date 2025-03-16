
// routes/cartRoutes.js
import express from 'express';
import {addItem, updateItem , getCart, deleteItem} from '../controllers/cartController.js';
import middleware from '../middleware/requireLogin.js';

const cartrouter = express.Router();

// Add an item to the cart
cartrouter.post('/', middleware, addItem);

// Update an item in the cart
cartrouter.put('/', middleware, updateItem);

// Get user's cart
cartrouter.get('/:userId', middleware, getCart);

// Delete item from cart
cartrouter.delete('/', middleware, deleteItem);

export default cartrouter;
