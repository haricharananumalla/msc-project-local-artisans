import { useEffect, useState } from "react";
import axios from "axios";
import { useData } from "../context/data";

const Cart = () => {
  const { data } = useData();
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const truncateDescription = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/api/v1/products/cart/${data._id}`
      );

      const updatedCart = response.data.map((item) => ({
        ...item,
        quantity: 1,
      }));
      setCart(updatedCart);

      const total = updatedCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setSubtotal(total);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      fetchCartItems();
    }
  }, [data]);

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/v1/products/cart/${data._id}/${itemId}`
      );
      const updatedCart = cart.filter((item) => item._id !== itemId);
      setCart(updatedCart);
      const newSubtotal = updatedCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setSubtotal(newSubtotal);
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === itemId) {
        item.quantity += 1;
      }
      return item;
    });
    setCart(updatedCart);
    const newSubtotal = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === itemId && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCart(updatedCart);
    const newSubtotal = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto lg:px-20 px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
        </div>
        <div className="mt-8">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row w-full border-b border-gray-400 py-4"
            >
              <div className="flex-shrink-0">
                <img
                  src={`http://localhost:3001/api/v1/products/product-image/${item._id}`}
                  alt={item.name}
                  className="w-32 h-32 object-cover"
                />
              </div>
              <div className="mt-4 md:mt-0 md:ml-6">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="mt-2 text-gray-600">
                  {" "}
                  {truncateDescription(item.description, 25)}
                </p>
                <div className="flex gap-5">
                  <p className="text-green-600 font-semibold">In Stock</p>
                  <p className="text-gray-600">Delivered by: 30/07/2024</p>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="mr-2 text-gray-600">Quantity:</span>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-200 rounded-l-lg px-2 py-1"
                      onClick={() => handleDecreaseQuantity(item._id)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="mx-2 text-gray-600">{item.quantity}</span>
                    <button
                      className="bg-gray-200 rounded-r-lg px-2 py-1"
                      onClick={() => handleIncreaseQuantity(item._id)}
                    >
                      +
                    </button>

                    <button
                      className="mx-4 text-red-600 hover:underline"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                  <span className="ml-auto font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center mt-8">
          <span className="text-gray-600 mr-4">Subtotal:</span>
          <span className="text-xl font-bold">${subtotal.toFixed(2)}</span>

          <button className="bg-zinc-800 mx-4 px-4 py-2 rounded-lg shadow-xl text-white hover:bg-black">
            Checkout Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
