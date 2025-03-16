// models/cartModel.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Productlist', required: true }, // Reference to Product model
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  price: { type: Number, required: true }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
