import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/complaint/mycomplaints`, {
        headers: { token },
      });
      if (response.data.success) {
        setComplaints(response.data.complaints);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
      toast.error("Failed to fetch complaints.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center bg-blue-50 p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Your Complaints</h1>
      {loading ? (
        <div className="text-blue-600">Loading complaints...</div>
      ) : complaints.length === 0 ? (
        <div className="text-blue-600">No complaints found.</div>
      ) : (
        <div className="w-full max-w-4xl">
          <table className="w-full border-collapse border border-blue-300 bg-white rounded shadow">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-blue-300 p-2">Title</th>
                <th className="border border-blue-300 p-2">Description</th>
                <th className="border border-blue-300 p-2">Category</th>
                <th className="border border-blue-300 p-2">Priority</th>
                <th className="border border-blue-300 p-2">Status</th>
                <th className="border border-blue-300 p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id} className="text-center">
                  <td className="border border-blue-300 p-2">{complaint.title}</td>
                  <td className="border border-blue-300 p-2">{complaint.description}</td>
                  <td className="border border-blue-300 p-2">{complaint.category}</td>
                  <td className="border border-blue-300 p-2">{complaint.priority}</td>
                  <td
                    className={`border border-blue-300 p-2 ${
                      complaint.status === "Resolved"
                        ? "text-green-600"
                        : complaint.status === "In Progress"
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  >
                    {complaint.status}
                  </td>
                  <td className="border border-blue-300 p-2">
                    {new Date(complaint.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserComplaints;
