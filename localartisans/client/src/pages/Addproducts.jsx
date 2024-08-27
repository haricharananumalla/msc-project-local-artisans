/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useData } from "../context/data";

const Addproducts = () => {
  const { data } = useData();
  const [productToAdd, setProductToAdd] = useState({
    name: "",
    description: "",
    photo: null,
    price: "",
    category: "",
    quantity: "",
  });

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const handleAddProductChange = (e) => {
    const { name, value, files } = e.target;
    setProductToAdd((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productToAdd.name);
    formData.append("description", productToAdd.description);
    formData.append("price", productToAdd.price);
    formData.append("category", productToAdd.category);
    formData.append("quantity", productToAdd.quantity);
    formData.append("userId", data._id); 

    if (productToAdd.photo) {
      formData.append("photo", productToAdd.photo);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/products/create-product",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { data: responseData } = response;

      if (responseData?.success) {
        setMessage({
          text: responseData.message,
          type: "success",
        });
        setProductToAdd({
          name: "",
          description: "",
          photo: null,
          price: "",
          category: "",
          quantity: "",
        });
      } else {
        setMessage({
          text: responseData?.message || "Failed to add product",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Failed to add product", error);
      setMessage({
        text: "Something went wrong while adding the product",
        type: "error",
      });
    }

 
    setTimeout(() => {
      setMessage({
        text: "",
        type: "",
      });
    }, 3000);
  };

  return (
    <div className="lg:px-16 p-4 py-4">
      <div className="flex lg:flex-row flex-col gap-4 justify-center items-center w-full h-full">
        <div className="w-full p-4 rounded-lg shadow-xl border border-zinc-500 h-full min-h-96">
          <h1 className="text-3xl text-center mb-12 font-semibold">Add Product</h1>
          <form onSubmit={handleAddProduct}>
            {message.text && (
              <div
                className={`mt-4 p-2 rounded-md text-black ${
                  message.type === "success" ? "bg-green-300" : "bg-red-300"
                }`}
              >
                {message.text}
              </div>
            )}
            <div className="flex lg:flex-row flex-col gap-4">
              <div className="lg:w-1/2 w-full">
                <h2>Name of the Product</h2>
                <input
                  className="h-8 px-4 w-full bg-zinc-100 rounded-md my-3"
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={productToAdd.name}
                  onChange={handleAddProductChange}
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <h2>Price of the Product</h2>
                <input
                  className="h-8 px-4 w-full bg-zinc-100 rounded-md my-3"
                  type="text"
                  name="price"
                  placeholder="Enter product price"
                  value={productToAdd.price}
                  onChange={handleAddProductChange}
                />
              </div>
            </div>
            <h2>Description of the Product</h2>
            <textarea
              className="h-fit min-h-24 px-4 w-full bg-zinc-100 rounded-md my-3"
              type="text"
              name="description"
              placeholder="Enter product description"
              value={productToAdd.description}
              onChange={handleAddProductChange}
            />
            <h2>Photo</h2>
            <input
              className="h-8 px-4 w-full my-3"
              type="file"
              name="photo"
              onChange={handleAddProductChange}
            />
            <h2>Category</h2>
            <input
              className="h-8 px-4 w-full bg-zinc-100 rounded-md my-3"
              type="text"
              name="category"
              placeholder="Enter product category"
              value={productToAdd.category}
              onChange={handleAddProductChange}
            />
            <h2>Quantity</h2>
            <input
              className="h-8 px-4 lg:w-80 w-full bg-zinc-100 rounded-md my-3"
              type="text"
              name="quantity"
              placeholder="Enter product quantity"
              value={productToAdd.quantity}
              onChange={handleAddProductChange}
            />
            <br />
            <button
              type="submit"
              className="bg-blue-500 px-6 text-white py-2 rounded-md mt-4"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addproducts;
