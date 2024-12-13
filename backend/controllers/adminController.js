import nodemailer from 'nodemailer';
import complaintModel from "../models/complaintModel.js";
import transporter from "../config/nodemailer.js";

// Function to send email notification about the complaint status update
const sendStatusUpdateEmail = (complaintTitle, status, updatedAt) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL, 
    to: process.env.ADMIN_EMAIL,   
    subject: `Complaint Status Updated: ${complaintTitle}`,
    text: `
      The status of the complaint "${complaintTitle}" has been updated to "${status}".
      \n\nUpdated on: ${updatedAt}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

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

// API for admin to get all the complaints
const complaintsAdmin = async (req, res) => {
  try {
    const complaints = await complaintModel.find({});
    res.json({ success: true, complaints });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API for updating complaint status
const updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    // Update the complaint status in the database
    const updatedComplaint = await complaintModel.findByIdAndUpdate(
      complaintId,
      { $set: { status } },
      { new: true }
    );

    if (updatedComplaint) {
      // Send email to the admin about the status update
      sendStatusUpdateEmail(updatedComplaint.title, updatedComplaint.status, new Date());

      res.json({
        success: true,
        message: "Complaint status updated successfully",
        complaint: updatedComplaint,
      });
    } else {
      res.status(404).json({ success: false, message: "Complaint not found" });
    }
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({ success: false, message: "Failed to update complaint status" });
  }
};

// API for deleting a complaint
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
};
