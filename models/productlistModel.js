// models/productModel.js
import mongoose from 'mongoose';

// Define the schema for a product
const productlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  category: String,
  image: {
    type: String, // This will store the image URL
    required: false // Make this optional, or true if every product must have an image
  }
});

// Create the Product model using the schema
const ProductList = mongoose.model('Productlist', productlistSchema);

export default ProductList;
