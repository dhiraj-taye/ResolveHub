import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [token] = useState(
    localStorage.getItem("token") || ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Product",
    priority: "Low",
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    if (!token) {
      toast.error("Authentication token is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/complaint/add`,
        formData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success("Your complaint was successfully registered.");
        setFormData({ title: "", description: "", category: "Product", priority: "Low" }); 
      } else {
        toast.error(response.data.message || "Failed to register complaint.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the complaint. Please try again.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-center gap-4 pt-5 sm:pt-14 min-h-[80vh] bg-blue-50"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[400px] bg-white p-6 rounded shadow-md border border-blue-200">
        <h1 className="text-xl font-bold text-blue-700 text-center mb-4">
          Submit a Complaint
        </h1>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="border border-blue-300 rounded py-2 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            className="border border-blue-300 rounded py-2 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="border border-blue-300 rounded py-2 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Product">Product</option>
            <option value="Service">Service</option>
            <option value="Support">Support</option>
          </select>
          <div className="flex flex-col gap-2">
            <h2 className="text-blue-700 font-medium">Priority</h2>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Low"
                checked={formData.priority === "Low"}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-blue-600">Low</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Medium"
                checked={formData.priority === "Medium"}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-blue-600">Medium</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="High"
                checked={formData.priority === "High"}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-blue-600">High</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Home;
