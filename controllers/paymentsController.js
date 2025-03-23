import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import razorpay from "../config/razorpay.js";

export const createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);
    console.log("ORDERS", order);
    res.status(201).send(order);
  } catch (err) {
    res.status(500).send(`Error creating Razorpay order: ${err.message}`);
  }
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const secret = process.env.RAZORPAY_SECRET;
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  try {
    const isValidSignature = validateWebhookSignature(
      body,
      razorpay_signature,
      secret
    );
    if (isValidSignature) {
      res.status(200).json({ status: "ok" });
      console.log("Payment verification successful");
    } else {
      res.status(400).json({ status: "verification_failed" });
      console.log("Payment verification failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error verifying payment" });
  }
};