import React from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Complaints from "./pages/Complaints";
import PrivateRoute from "./components/PrivateRoute";


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Complaints />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
