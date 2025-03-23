import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentsController.js';

const paymentrouter = express.Router();

// Define routes
paymentrouter.post('/order', createOrder);
paymentrouter.post('/verify', verifyPayment);

// Export the router
export default paymentrouter;