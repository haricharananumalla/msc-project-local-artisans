// import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/search";
import toast from "react-hot-toast";
import axios from "axios";
import { useData } from "../context/data";

const SearchResults = () => {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useSearch();
  const { data } = useData();
  const handleAddToCart = async (productId) => {
    try {
      
      const response = await axios.post(
        `http://localhost:3001/api/v1/products/add-to-cart/${data._id}`,
        { productId }
      );

      console.log(response.data.message); 
      toast.success("Item added to cart")
    } catch (error) {
      console.error("Failed to add product to cart", error);
    }
  };

  const truncateDescription = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };



  return (
    <div>
      <div className=" pt-6 lg:px-16">
        <h1 className="text-center">Search results...</h1>
        <h4 className="text-center">
          {value?.result.length < 1
            ? "no product found"
            : `found ${value?.result.length} results based on your search`}
        </h4>

        <div className="grid justify-items-center	 lg:pt-12 grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
          
          {value?.result.map((p) => (
            <div
            key={p._id}
            className="relative flex w-80 flex-col rounded-xl bg-zinc-100 bg-clip-border text-gray-700 shadow-md"
          >
            <div className="relative mx-4 mt-4 h-64 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
              <img
                src={`http://localhost:3001/api/v1/products/product-image/${p._id}`}
                className="h-full w-full object-cover"
                alt={p.name}
              />
            </div>
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                  {p.name}
                </p>
                <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                  ${p.price}
                </p>
              </div>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
              {truncateDescription(p.description, 20)}
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => handleAddToCart(p._id)}
                className="block w-full select-none rounded-lg hover:bg-black text-white bg-zinc-800 py-3 px-6 text-center align-middle"
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
