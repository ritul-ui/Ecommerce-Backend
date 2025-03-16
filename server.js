
import dotenv from 'dotenv';
import express from "express";
import CORS from "cors";
import helmet from 'helmet';

import {connectUsingMongoose} from "./config/db.js";
// import userRouter from "./routes/userRoutes.js";
import productlistRouter from "./routes/productlistRoutes.js";
import authrouter from "./routes/authRoutes.js";
import cartrouter from './routes/cartRoutes.js';
import userdetailrouter from './routes/userDetailsRoutes.js';
// import jwtAuth from './middlewares/jwt.middleware.js';

// load all the env varaibles in application
dotenv.config();

const app = express();
// Use Helmet middleware
app.use(helmet({
    contentSecurityPolicy: false, 
    crossOriginEmbedderPolicy: false, 
}));
const port = 3100;

app.use(express.json()); // or body-parser

app.use(express.urlencoded({ extended: true }));
app.use(CORS());
// app.use('/users', userRouter);
app.use("/auth", authrouter);
app.use('/productlists', productlistRouter);
app.use("/cart", cartrouter);
app.use("/userdetails", userdetailrouter);

app.get('/', (req, res) => {
    return res

    .status(200)
   
    .json({ success: true, message: "Welcome to E-Commerce" });
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    connectUsingMongoose();
})


