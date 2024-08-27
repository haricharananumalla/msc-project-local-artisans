import productModel from "../models/product.model.js";
import fs from "fs";
import slugify from "slugify";
import userModel from "../models/user.model.js";


export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping, userId } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "Photo should be less than 1MB" });
    }

    // Create the product
    const newProduct = new productModel({
      ...req.fields,
      slug: slugify(name),
      createdBy: userId // Associate product with the user
    });

    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }

    // Save the product
    await newProduct.save();

    // Update the user's products array
    await userModel.findByIdAndUpdate(
      userId, // User ID
      { $push: { products: newProduct._id } }, 
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).json({
      success: true,
      message: "product deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error while deleting product",
      error,
    });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await productModel.find()
    
    // Send the products in the response
    res.status(200).json(products);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Failed to fetch products" });
  }
};


export const getProductImage = async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await productModel.findById(id).select("photo"); 

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!product.photo || !product.photo.data) {
      return res.status(404).json({ error: "Photo not found" });
    }

    res.set("Content-Type", product.photo.contentType);
    res.send(product.photo.data); 
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product image" });
  }
};

export const addToCart = async (req, res) => {
  try {
   
    const userId = req.params.userId;
    const { productId } = req.body;

    console.log(userId, productId);

   
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.cart.includes(productId)) {
      return res.status(400).json({ error: "Product already in cart" });
    }

    
    user.cart.push(productId);
    await user.save();

    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};


export const getCartItems = async (req, res) => {
  try {
   
    const { userId } = req.params;
console.log(userId)
    
    const user = await userModel.findById(userId).populate('cart');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    const cartItems = await productModel.find({ _id: { $in: user.cart } });

  
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Failed to retrieve cart items" });
  }
};



export const deleteCartItem = async (req, res) => {
  const { userId, itemId } = req.params;

  try {

    const user = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { cart: itemId } }, 
      { new: true }
    ).exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Item removed from cart', updatedCart: user.cart });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const searchProductController = async (req, res) => {
  try {
    
    const { keyword } = req.params;
    const result = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ],
    })
    .select("-photo");
  res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "error in search product",
      error,
    });
  }
};

export const getLatestProductsController = async (req, res) => {
  try {
    const latestProducts = await productModel.find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .select('-photo');

    res.status(200).json({
      success: true,
      products: latestProducts
    });
  } catch (error) {
    console.error('Error while fetching latest products', error);
    res.status(500).json({
      success: false,
      message: 'Error while fetching latest products',
      error
    });
  }
};


export const getUserProducts = async (req, res) => {
  try {
    const { userId } = req.params;
    const products = await productModel.find({ createdBy: userId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};


export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
