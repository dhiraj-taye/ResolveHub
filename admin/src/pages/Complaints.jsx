import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [atoken] = useState(localStorage.getItem("atoken") || "");
  const navigate = useNavigate(); 

  const fetchComplaints = async () => {
    if (!atoken) {
      toast.error("Authentication token is missing. Please log in again.");
      return;
    }

    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/all-complaints`,
        {
          headers: { atoken },
        }
      );
      if (data.success) {
        setComplaints(data.complaints);
      } else {
        toast.error("Failed to fetch complaints.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching complaints.");
    }
  };

  const updateStatus = async (complaintId, newStatus) => {
    if (!atoken) {
      toast.error("Authentication token is missing. Please log in again.");
      return;
    }

    try {
      const { data } = await axios.put(
        `${backendUrl}/api/admin/complaints/${complaintId}`,
        { status: newStatus },
        {
          headers: { atoken },
        }
      );
      if (data.success) {
        toast.success("Complaint status updated successfully.");
        fetchComplaints(); 
      } else {
        toast.error(data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating complaint status.");
    }
  };

  const deleteComplaint = async (complaintId) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/complaints/${complaintId}`,
        {
          headers: { atoken },
        }
      );
      if (data.success) {
        toast.success("Complaint deleted successfully.");
        fetchComplaints(); 
      } else {
        toast.error(data.message || "Failed to delete complaint.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting complaint.");
    }
  };

  const logout = () => {
    localStorage.removeItem("atoken"); 
    navigate("/login"); 
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-center">Admin Complaints</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg transition-all hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="space-y-4">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="border p-4 rounded-lg shadow-md bg-white flex flex-col"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">{complaint.title}</h2>
              <span
                className={`text-xs font-bold py-1 px-3 rounded-full ${
                  complaint.priority === "High"
                    ? "bg-red-500 text-white"
                    : complaint.priority === "Medium"
                    ? "bg-yellow-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {complaint.priority}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{complaint.description}</p>
            <p className="mb-2">
              <strong>Category:</strong> {complaint.category}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {complaint.status}
            </p>

            <div className="space-x-3 mt-3">
              <button
                onClick={() => updateStatus(complaint._id, "In Progress")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg transition-all hover:bg-blue-700"
              >
                In Progress
              </button>
              <button
                onClick={() => updateStatus(complaint._id, "Resolved")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg transition-all hover:bg-green-700"
              >
                Mark as Resolved
              </button>
              {complaint.status === "Resolved" && (
                <button
                  onClick={() => deleteComplaint(complaint._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg transition-all hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;
