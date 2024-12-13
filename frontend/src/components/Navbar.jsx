import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(true); // Update this as necessary

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken(""); // Clear token on logout
  };

  return (
    <div className="flex items-center justify-between text-sm mb-5 border-b border-b-gray-400">
      <Link to="/">
        <img src="logo.png" className="w-10" alt="Logo" />
      </Link>
      <div>
        <NavLink
          to="/my-complaints"
          className="flex flex-col items-center gap-1"
        >
          <p className="font-bold">My Complaints</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </div>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <button
              onClick={logout}
              className="text-sm font-semibold text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="text-sm font-semibold text-gray-700 hover:text-gray-900"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
