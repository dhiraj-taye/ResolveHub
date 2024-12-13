import transporter from "../config/nodemailer.js";
import complaintModel from "../models/complaintModel.js";
import userModel from "../models/userModel.js"; 

// API to get new complaints
const complaints = async (req, res) => {
  try {
    const { userId, title, description, category, priority } = req.body;

    if (!title || !description || !category || !priority || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const complaintData = {
      userId,
      title,
      description,
      category,
      priority,
      date: Date.now(),
    };

    const newComplaint = new complaintModel(complaintData);
    await newComplaint.save();

    if (!process.env.SENDER_EMAIL || !process.env.ADMIN_EMAIL) {
      console.error("Missing email environment variables");
      return res
        .status(500)
        .json({ success: false, message: "Server email configuration error" });
    }

    // function to send email to the admin
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Complaint Registered",
      text: `A new complaint was submitted:\n
             Title: ${title}\n
             Description: ${description}\n
             Category: ${category}\n
             Priority: ${priority}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      return res
        .status(500)
        .json({ success: false, message: "Failed to send notification email" });
    }

    res.status(201).json({
      success: true,
      message: "Complaint registered successfully",
    });
  } catch (error) {
    console.error("Error registering complaint:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// API to get user's complaints
const getComplaints = async (req, res) => {
  try {
    const { userId } = req.body; 
    const complaints = await complaintModel
      .find({ userId })
      .select("title description category priority status date");
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { complaints, getComplaints };
