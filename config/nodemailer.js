import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();



console.log("use", process.env.SENDGRID_USERNAME );
const transporter = nodemailer.createTransport({
  
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USERNAME,
    pass: process.env.SENDGRID_PASSWORD,
  },
});



export default transporter;