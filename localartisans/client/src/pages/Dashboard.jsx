import { useEffect, useState } from "react";
import Graph from "../components/Graph";
import Graph2 from "../components/Graph2";
import Addproducts from "./Addproducts";
import axios from "axios";
import toast from "react-hot-toast";
import { useData } from "../context/data";


const Dashboard = () => {
  const [allproducts, setAllproducts] = useState([]);
  const [loading, setLoading] = useState(true); 
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
        `http://localhost:3001/api/v1/products/user-products/${data._id}`
      );
      setAllproducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [data._id]); 

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/v1/products/delete-product/${productId}`
      );

      if (response.data.success) {
        setAllproducts(allproducts.filter((product) => product._id !== productId));
        toast.success("Product deleted");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product");
    }
  };

  if (data.role === "Buyer") {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Unauthorized access</h1>
      </div>
    );
  }

  return (
    <div className="lg:px-16 p-4">
      <h1 className="py-5 text-2xl text-center uppercase font-bold">
        Seller DASHBOARD
      </h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/3 w-full flex flex-col justify-center items-center gap-4 h-full">
         
          <div className="h-44 w-72 rounded-lg justify-center items-center flex flex-col shadow-lg border border-gray-400">
            <h1 className="text-2xl font-semibold py-2">Revenue</h1>
            <h1> $89473</h1>
          </div>
          <div className="h-44 w-72 rounded-lg justify-center items-center flex flex-col shadow-lg border border-gray-400">
            <h1 className="text-2xl font-semibold py-2">
              Number of items sold
            </h1>
            <h1> 527</h1> 
          </div>
          <div className="h-44 w-72 rounded-lg justify-center items-center flex flex-col shadow-lg border border-gray-400">
            <h1 className="text-2xl font-semibold py-2">Profit</h1>
            <h1> $72873</h1>
          </div>
          <div className="h-44 w-72 rounded-lg justify-center items-center flex flex-col shadow-lg border border-gray-400">
            <h1 className="text-2xl font-semibold py-2">Total Products</h1>
            <h1> {allproducts.length}</h1> 
          </div>
        </div>
        <div className="lg:w-2/3 w-full h-full">
          <Graph2 />
          <Graph />
        </div>
      </div>

      <Addproducts allproducts={allproducts} setAllproducts={setAllproducts} />

      <h1 className="uppercase text-2xl text-center py-12 font-bold">Your Products</h1>
    
<div className="grid lg:px-16 grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
  {loading ? (
    <div className="flex justify-center items-center w-full h-48">
      <p>Loading...</p>
    </div>
  ) : allproducts.length === 0 ? (
    <div className="flex justify-center items-center w-full h-48">
      <p>No products found</p>
    </div>
  ) : (
    allproducts.map((product) => (
      <div
        key={product._id}
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
            {truncateDescription(product.description, 30)}
          </p>
        </div>
        <div className="p-6 pt-0">
          <button
            onClick={() => handleDeleteProduct(product._id)}
            className="block w-full mt-2 select-none rounded-lg hover:bg-red-700 text-white bg-red-600 py-3 px-6 text-center align-middle"
            type="button"
          >
            Delete Product
          </button>
        </div>
      </div>
    ))
  )}
</div>
    </div>
  );
};

export default Dashboard;
