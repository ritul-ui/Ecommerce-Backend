import express from 'express';
import {importProductList, addProduct, getAllProducts}  from '../controllers/productListController.js';
import middleware from '../middleware/requirelogin.js';

const productlistRouter = express.Router();

// Define routes
productlistRouter.get('/import',middleware,  importProductList); 
productlistRouter.get('/get', middleware,  getAllProducts); 
productlistRouter.post("/add", middleware, addProduct );

// Export the router
export default productlistRouter;

