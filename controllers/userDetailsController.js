import UserDetails from "../models/userDetailsModel.js";
import User from "../models/authModel.js";
import middleware from "../middleware/requireLogin.js";
import mongoose from 'mongoose';

// Route to get user details by ID
export const getUserDetails = async (req, res) => {
  try {
    // Find the user details by ID and populate 'profileData' with 'name' and 'email' from the User model
    const userDetails = await UserDetails.findById(req.params.id).populate(
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
    const { profileData, profilePic, address, personalDetails } = req.body;
    console.log("postuserdetails", req.body);

    // Check if the referenced User exists
    const existingUser = await User.findById(profileData);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found in the User model" });
    }

    // Create new UserDetails document
    const newUserDetails = new UserDetails({
      profileData, // The ID referencing the User model
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
      console.log("req params", req.params.id);
      const {id} = req.params;
  
      // Validate the ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid user ID format" });
        }
    
        console.log("Received ID:", id);
  
        // Check if the document exists
      const userDetails = await UserDetails.findById(id);
      console.log("user detail", userDetails);
      if (!userDetails) {
        return res.status(404).json({ message: "User details not found" });
      }
  
      // Find the user details by ID and update with the new data
      const updatedUserDetails = await UserDetails.findByIdAndUpdate(
        req.params.id,
        {
          profilePic,
          address,
          personalDetails,
        },
        { new: true, runValidators: true } // Return the updated document and run validators
      );
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
  