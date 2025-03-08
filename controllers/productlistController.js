// controllers/productListController.js
import fs from 'fs';
import Product from '../models/productModel.js';

// Controller to import product data from JSON file into MongoDB
const importProductList = async (req, res) => {
  try {
    // Read the products.json file asynchronously
    const data = await fs.promises.readFile('products.json', 'utf8');

    // Parse the JSON data
    const productslist = JSON.parse(data);

    // Insert the products into MongoDB using Mongoose's insertMany
    await Product.insertMany(productslist);

    // Send success response
    res.status(200).send('Data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).send('Error importing data');
  }
};


// Controller to get the product data from products.json
const getProductList = async (req, res) => {
    try {
      // Read the products.json file asynchronously
      const data = await fs.promises.readFile('products.json', 'utf8');
  
      // Parse the JSON data and send it as a response
      const products = JSON.parse(data);
      res.status(200).json(products);
    } catch (error) {
      console.error('Error reading products data:', error);
      res.status(500).send('Error reading products data');
    }
  };

export { importProductList, getProductList  };
