/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useData } from "../context/data";

const ProductDetail = () => {
  const { id } = useParams();
  const { data } = useData();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

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

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        Loading...
      </div>
    );
  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src={`http://localhost:3001/api/v1/products/product-image/${product._id}`}
            className="w-full h-auto object-cover rounded"
            alt={product.name}
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button
            onClick={() => handleAddToCart(product._id)}
            className="block w-full select-none rounded-lg hover:bg-black text-white bg-zinc-800 py-3 px-6 text-center align-middle"
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
