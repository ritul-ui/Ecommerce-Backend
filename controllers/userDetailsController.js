import UserDetails from "../models/userDetailsModel.js";
import User from "../models/authModel.js";
import middleware from "../middleware/requireLogin.js";
import mongoose from 'mongoose';
import { ObjectId } from "mongodb";

// Route to get user details by ID
export const getUserDetails = async (req, res) => {
  try {
    const id = req.user?._id?.toString() ?? '';
    console.log("id get", id);
    // Find the user details by ID and populate 'profileData' with 'name' and 'email' from the User model
    // const userDetails = await UserDetails.findById(id).populate(
    //   "profileData",
    //   "name email"
    // );
    const userDetails = await UserDetails.find({profileData : new ObjectId(id)}).populate(
      "profileData",
      "name email"
    );

    console.log("user details", userDetails);

    if (!userDetails) {
      return res.status(404).json({ message: "User details not found" });
    }

    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Route to add new user details
export const postUserDetails = async (req, res) => {
  try {
    console.log("user", req.user);
     const id = req.user?._id?.toString() ?? ''; 
      console.log("id>>", id);
    const {  profilePic, address, personalDetails } = req.body;
    console.log("postuserdetails", req.body);

    // Check if the referenced User exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found in the User model" });
    }

    // Create new UserDetails document
    const newUserDetails = new UserDetails({
      profileData : id, // The ID referencing the User model
      profilePic,
      address,
      personalDetails,
    });

    // Save the document to the database
    const savedUserDetails = await newUserDetails.save();

    res.status(201).json({
      message: "User details added successfully",
      data: savedUserDetails,
    });
  } catch (error) {
    console.error("Error adding user details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Route to update user details by ID
export const updateUserDetails = async (req, res) => {
    try {
      const { profilePic, address, personalDetails } = req.body;
      // console.log("req params", req.params.id);
      // const {id} = req.params;
      const id = req.user?._id?.toString() ?? '';
      // const id = req.user._id;
      console.log("id update", id);

      console.log("mongoose.Types.ObjectId", mongoose.Types.ObjectId.isValid(id));
     
  
      // Validate the ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid user ID format" });
        } // to ask riddhi
    
        console.log("Received ID:", id.toString());
        console.log("objec",  new ObjectId(id));
  
        // Check if the document exists
      // const userDetails = await UserDetails.findById(id);
      // console.log("user detail", userDetails);
      // if (!userDetails) {
      //   return res.status(404).json({ message: "User details not found" });
      // }
  
      // Find the user details by ID and update with the new data
      const updatedUserDetails = await UserDetails.findOneAndUpdate( // this find only first occurene of profile data value match  and updates that profiledata only
       { profileData : new ObjectId(id) }, // id is new ObjectId("")
        {
          profilePic,
          address,
          personalDetails,
        },
        { new: true, runValidators: true } // Return the updated document and run validators
      ).populate("profileData", "name email");
      console.log("updateduserdetail", updatedUserDetails);
  
      if (!updatedUserDetails) {
        return res.status(404).json({ message: "User details not found" });
      }
  
      res.status(200).json({
        message: "User details updated successfully",
        data: updatedUserDetails,
      });
    } catch (error) {
      console.error("Error updating user details:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  