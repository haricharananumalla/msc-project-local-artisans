/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useData } from "../context/data";
import axios from "axios";
import toast from "react-hot-toast";

const Homepage = () => {
  const { data } = useData();
  const [trending, setTrending] = useState([]);

  const truncateDescription = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };


  const getLatestProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/products/latest-products"
      );
      setTrending(response.data.products);
    } catch (error) {
      console.error("Failed to fetch latest products", error);
      throw error;
    }
  };

  useEffect(()=>{
    getLatestProducts()
  },[])

 

  const handleAddToCart = async (productId) => {
    try {
     
      const response = await axios.post(
        `http://localhost:3001/api/v1/products/add-to-cart/${data._id}`,
        { productId }
      );
 
      toast.success("item added to cart")
    } catch (error) {
      console.error("Failed to add product to cart", error);
    }
  };

  return (
    <>
    
      <div className=" flex relative h-screen z-20 items-center overflow-hidden homebg bg-black backdrop-opacity-15">
        <div className="container mx-auto flex relative w-full  py-16 p-3 lg:px-24">
          <div className="sm:w-2/3 lg:w-1/2 flex flex-col relative z-20">
            <h1 className="font-bebas-neue drop-shadow-2xl uppercase text-3xl font-black flex flex-col leading-none  text-gray-100">
              Explore a wide variety of unique art and craft products !
            </h1>
            <p className="text-sm sm:text-base my-2 text-gray-100 ">
              Welcome to Brand Name , your one-stop shop for unique and
              handcrafted art and craft products. Discover a diverse range of
              items made by talented artists from around the world.
            </p>

            {data.role === "Buyer" || data.role === "Seller" ? (
              <Link
                to={"/allproducts"}
                className="bg-black rounded-lg shadow-xl text-white px-4 py-2 mt-4 w-fit"
              >
                Explore Products
              </Link>
            ) : (
              <div className="flex flex-col mt-8">
                <h1 className="text-2xl text-white font-bold">Start as</h1>
                <div className="flex gap-6 my-4">
                  <Link
                    to={"/signup"}
                    className="border border-gray-900 px-4 text-black w-44 flex justify-center items-center shadow-xl  py-2 rounded-md bg-white"
                  >
                    Buyer
                  </Link>
                  <Link
                    to={"/signup"}
                    className="border border-gray-900 px-4 text-black w-44 flex justify-center items-center shadow-xl  py-2 rounded-md bg-white"
                  >
                    Seller
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/*  Trending section */}
      <h1 className="text-3xl mt-12 my-6 font-semibold text-center">
        New Arrivals
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 p-4 lg:grid-cols-3 lg:px-24 lg:gap-8">
        {trending.map((product, index) => (
          <div
          key={index}
          className="relative flex flex-col rounded-xl bg-zinc-100 bg-clip-border text-gray-700 shadow-md"
        >
          <div className="relative mx-4 mt-4 h-64 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
            <img
              src={`http://localhost:3001/api/v1/products/product-image/${product._id}`}
              className="h-full w-full object-cover"
              alt={product.name}
            />
          </div>
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
      </div>

     

      <Footer />
    </>
  );
};

export default Homepage;
