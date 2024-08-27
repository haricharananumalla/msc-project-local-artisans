import { useState, useEffect } from "react";
import { useData } from "../context/data";
import axios from "axios";

const ProfilePage = () => {
  const { data, setData } = useData();

  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState(null); 
  const [messageType, setMessageType] = useState(""); 


  useEffect(() => {
    if (data) {
      setFormState({
        name: data.name || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    }
  }, [data]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setMessage("")
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/auth/update-profile/${data._id}`,
        formState
      );

      setData((prevData) => ({
        ...prevData,
        ...response.data.updatedUser,
      }));
      setMessage("Profile updated successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage("Failed to update profile.");
      setMessageType("error");
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-6 h-screen justify-center items-center">
      <h1 className="text-xl text-center">Your Account</h1>
      <div className="flex flex-row rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="w-full p-8">
          <h1 className="text-xl font-semibold">Edit Profile</h1>
          {message && (
            <div
              className={`my-4 p-4 ${
                messageType === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } rounded`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleFormSubmit}>
            <div className="flex w-full gap-4">
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                name="address"
                value={formState.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role
              </label>
              <select
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                name="role"
                value={data.role || "Buyer"}
                required
                disabled
              >
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                name="email"
                value={data.email || ""}
                required
                disabled
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="bg-purple-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-purple-600"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
