// controllers/productListController.js
import fs from 'fs';
import ProductList from '../models/productlistModel.js';

// Controller to import product data from JSON file into MongoDB
const importProductList = async (req, res) => {
  try {
    // Read the products.json file asynchronously
    const data = await fs.promises.readFile('products.json', 'utf8');

    // Parse the JSON data
    const productslist = JSON.parse(data);

    // Insert the products into MongoDB using Mongoose's insertMany
    await ProductList.insertMany(productslist);

    // Send success response
    res.status(200).send('Data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).send('Error importing data');
  }
};


// Controller to get the product data from products.json
// const getProductList = async (req, res) => {
//     try {
//       // Read the products.json file asynchronously
//       const data = await fs.promises.readFile('products.json', 'utf8');
  
//       // Parse the JSON data and send it as a response
//       const products = JSON.parse(data);
//       res.status(200).json(products);
//     } catch (error) {
//       console.error('Error reading products data:', error);
//       res.status(500).send('Error reading products data');
//     }
//   };

// Get all product list
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductList.find(); // Fetching products from the database
    res.status(200).json(products); // Respond with the list of products
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

// Add a new product
export const addProduct = async (req, res) => {
  const { name, price, description, image } = req.body;
  // console.log("req user email", req.userID);

  // Check if the required fields are provided
  if (!name || !price || !description || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create a new product instance
  const productlist  = new ProductList({ name, price, description, image }); //changes

  try {
    await productlist.save(); // Save the product to the database
    res.status(201).json({ message: "Product created successfully", productlist  });
  } catch (err) {
    res.status(400).json({ message: "Error creating product", error: err.message });
  }
};

export { importProductList  };
