

import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/search";

const Searchbar = () => {
  const [value, setValue] = useSearch();
  const navigate = useNavigate();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
   


    if (!value.keyword.trim()) {
      console.error("Search keyword cannot be empty");
      return;
    }

    try {

      const response = await axios.get(
        `http://localhost:3001/api/v1/products/search/${value.keyword}`
      );
      const { data } = response;

      if (Array.isArray(data)) {
        setValue({ ...value, result: data });
        navigate("/search");
      } else {
        console.error("Invalid response data format:", data);
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Response:", error.response);
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="h-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300"
    >
      <input
        type="text"
        placeholder="Type to search..."
        value={value.keyword}
        onChange={(e) => setValue({ ...value, keyword: e.target.value })}
        className="bg-none w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
        name="topic"
      />

      <button
        type="submit"
        aria-label="Search"
        className="flex flex-row items-center justify-center border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base text-black border-transparent h-full -mr-3"
      >
        <FaSearch />
      </button>
    </form>
  );
};


export default Searchbar;
