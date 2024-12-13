import complaintModel from "../models/complaintModel.js";
import jwt from "jsonwebtoken";

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const atoken = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, atoken });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for admin to get All the complaints
const complaintsAdmin = async (req, res) => {
  try {
    const complaints = await complaintModel.find({});
    res.json({ success: true, complaints });
  } catch (error) {}
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params; 
    const { status } = req.body; 

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const updatedComplaint = await complaintModel.findByIdAndUpdate(
      complaintId,
      { $set: { status } },
      { new: true } 
    );

    if (updatedComplaint) {
      res.json({ success: true, message: "Complaint status updated successfully", complaint: updatedComplaint });
    } else {
      res.status(404).json({ success: false, message: "Complaint not found" });
    }
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({ success: false, message: "Failed to update complaint status" });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params; 
    
    const complaint = await complaintModel.findByIdAndDelete(complaintId);
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export {
    loginAdmin,
    complaintsAdmin,
    updateComplaintStatus,
    deleteComplaint
}