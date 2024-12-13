import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aToken, setAToken] = useState(localStorage.getItem("atoken") || "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault(); 
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("atoken", data.atoken);
        setAToken(data.atoken);
        toast.success("Login successful!");
      } else {
        toast.error(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  useEffect(() => {
    if (aToken) {
      navigate("/");
    }
  }, [aToken]); 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-full max-w-md p-6 bg-white shadow-md rounded-md text-gray-800"
      >
        <div className="text-center mb-6">
          <p className="text-3xl font-semibold text-gray-800">ADMIN LOGIN</p>
          <hr className="mt-2 border-t-[1.5px] border-gray-800 w-12 mx-auto" />
        </div>

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
