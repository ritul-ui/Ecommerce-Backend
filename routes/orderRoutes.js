import express from "express";
import { createOrder, getUserOrders, getOrderById, updateOrderStatus } from "../controllers/orderController.js"; // Import the Order Controller
import middleware from '../middleware/requireLogin.js';

const orderrouter = express.Router();

// Route to create a new order
orderrouter.post("/", middleware, createOrder);

// Route to get all orders for a specific user
orderrouter.get("/user/:userId", getUserOrders);

// Route to get details of a specific order
orderrouter.get("/:orderId", getOrderById);

// Route to update the status of an order
orderrouter.patch("/:orderId", updateOrderStatus);

export default orderrouter;