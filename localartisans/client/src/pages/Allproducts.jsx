/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useData } from "../context/data";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Allproducts = () => {
  const [allproducts, setAllproducts] = useState([]);
  const { addToCart } = useData();

  const { data } = useData();

  const truncateDescription = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/products/allproducts"
      );
      setAllproducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await getAllProducts();
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1/products/add-to-cart/${data._id}`,
        { productId }
      );

      toast.success("item added to cart");
    } catch (error) {
      console.error("Failed to add product to cart", error);
    }
  };

  return (
    <div className="lg:px-20 p-4">
      <h1 className="py-4 text-2xl">Filter</h1>
      <hr className="py-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
        {allproducts.length === 0 ? (
          <>
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="relative flex flex-col rounded-xl p-4 h-96 bg-zinc-100 bg-clip-border shadow-md"
              >
                <div className="w-full h-64 bg-zinc-200 rounded-xl"></div>
              </div>
            ))}
          </>
        ) : (
          <>
            {allproducts.map((product, index) => (
              <div key={index} className="relative flex flex-col rounded-xl bg-zinc-100 bg-clip-border text-gray-700 shadow-md">
                  <Link to={`/product/${product._id}`}>
                  <div className="relative mx-4 mt-4 h-64 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <img
                      src={`http://localhost:3001/api/v1/products/product-image/${product._id}`}
                      className="h-full w-full object-cover"
                      alt={product.name}
                    />
                  </div>
                  </Link>
                  <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        {product.name}
                      </p>
                      <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        ${product.price}
                      </p>
                    </div>
                    <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                      {truncateDescription(product.description, 20)}
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="block w-full select-none rounded-lg hover:bg-black text-white bg-zinc-800 py-3 px-6 text-center align-middle"
                      type="button"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
           
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Allproducts;
