import express from 'express';
import {importProductList, addProduct, getAllProducts}  from '../controllers/productListController.js';

const productlistRouter = express.Router();

// Define routes
productlistRouter.get('/', importProductList); 
productlistRouter.get('/get', getAllProducts); 
productlistRouter.post("/add",addProduct );

// Export the router
export default productlistRouter;

