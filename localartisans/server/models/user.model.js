import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Buyer", "Seller"],
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
  products: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
}, { timestamps: true });


const userModel = mongoose.model("User", userSchema);

export default userModel;
