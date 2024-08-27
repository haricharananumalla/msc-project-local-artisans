import { comparePassword, hashPassword } from "../helper/suthHelper.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, phone, address, password, role } = req.body;


    if (!name || !email || !password || !phone || !address || !role) {
      return res
        .status(400)
        .json({ error: "Please provide all required information." });
    }

    const validRoles = ["Buyer", "Seller"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role specified." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please provide a valid email address." });
    }

  
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists. Please login." });
    }


    const hashedPassword = await hashPassword(password);

  
    const user = new userModel({
      name,
      address,
      phone,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};


export const loginController = async (req, res) => {
  try {
    const {email, password } = req.body;


    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide both email and password." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please provide a valid email address." });
    }


    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User with this email does not exist. Please register." });
    }

 
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Incorrect password. Please try again." });
    }

  
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res
      .status(200)
      .json({ user, success: true, message: "Login successful.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};



export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, phone, address } = req.body; 

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    
    const updatedUser = await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
