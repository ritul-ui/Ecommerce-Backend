import User from "../models/userModel.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("user", users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Add a new user
export const addUser = async (req, res) => {
  const { name, age } = req.body;
  console.log("req body", name, age);
  const user = new User({ name, age });
    console.log("user", user);
  try {
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating user", error: err.message });
  }
};
