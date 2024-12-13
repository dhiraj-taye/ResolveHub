import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Mycomplaints from "./pages/Mycomplaints";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* Unprotected route: Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Route: Home, will redirect to login if not authenticated */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/my-complaints" element={<Mycomplaints />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
