import express from 'express';
import {importProductList, getProductList}  from '../controllers/productListController.js';

const productlistRouter = express.Router();

// Define routes
productlistRouter.get('/', importProductList); 
productlistRouter.get('/products', getProductList); 

// Export the router
export default productlistRouter;

