import Jwt from 'jsonwebtoken';
import Hash from 'bcryptjs';
// import bcrypt from "bcrypt";
import dotenv from 'dotenv';

import User from '../models/authModel.js';
import transporter from '../config/nodemailer.js';



dotenv.config();

console.log("ee", process.env.SENDGRID_FROM_EMAIL);
// Sign up user
export const signupUser = async (req, res) => {
  const { email, password, fullname } = req.body;
  if (!email || !password || !fullname) {
    return res.status(422).json({ error: "Please fill all the required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "User already exists" });
    }

    const hashedPassword = await Hash.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      name: fullname,
    });

    const savedUser = await user.save();

    // Send email after user is saved
    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL,
      to: email,
      subject: 'Welcome to Our Service',
      text: `Hello ${fullname},\n\nThank you for signing up! We're glad to have you on board.\n\nBest regards,\nYour Company Name`
    };

    console.log("sign up");
    try{
      await transporter.sendMail(mailOptions);
      console.log("Success : Email sent to ");
  }catch(err){
      console.log("email send failed"+ err)
  }
    
    res.json({ message: "User saved successfully and welcome email sent" });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Log in user
export const loginUsers = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({ error: "Invalid email or password" });
    }

    const doMatch = await Hash.compare(password, user.password);
    console.log("domatch", doMatch);
    if (doMatch) {
      const token = Jwt.sign({ userID: user._id , email : user.email}, process.env.JWTTOKENS, { expiresIn: '1h' });
      console.log("token", token);
      const { _id, name, email } = user;
      res.json({
        token,
        user: { _id, name, email },
      });
    } else {
      res.status(422).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: "Internal server error" });
  }
  
};
