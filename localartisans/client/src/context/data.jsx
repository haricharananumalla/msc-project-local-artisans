// DataProvider.js
import PropTypes from "prop-types";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("loginedUser");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (data.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    }
    localStorage.setItem("loginedUser", JSON.stringify(data));
  }, [data]);

  const addToCart = async (productId) => {
    if (!data.user) {
      console.error("User is not logged in");
      return;
    }

    try {
      const response = await axios.post(`/api/v1/users/${data.user._id}/cart`, { productId });
    
      setData((prevData) => ({
        ...prevData,
        user: response.data.user,
      }));
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  return (
    <DataContext.Provider value={{ data, setData, addToCart }}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
