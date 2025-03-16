import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/authModel.js"; // Explicitly importing User model if needed

const requireLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(422).json({ error: "Not authorized" });
  }
  
  const token = authorization.replace("bearer ", "");
  
  JWT.verify(token, process.env.JWTTOKENS, (err, payload) => {
    if (err) {
      return res.status(402).json({ error: "Verification failed" });
    }

    const { _id } = payload;
    console.log("token verify", payload);
    User.findById(_id)
      .then((userdata) => {
        req.user = userdata;
        next();
      })
      .catch(() => {
        return res.status(500).json({ error: "Internal Server Error" });
      });
  });
};

export default requireLogin;
