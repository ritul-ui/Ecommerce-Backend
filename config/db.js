import mongoose from "mongoose";


const url = ""; // your local url connection add here
console.log("url", url);


export const connectUsingMongoose = () => {
  try {
    mongoose
      .connect(url)
      .then(() => {
        console.log("Mongodb using mongoose is connected");
      })
      .catch((err) => {
        console.log(" err mongose", err);
      });
  } catch (err) {
    console.log(err);
  }
};

