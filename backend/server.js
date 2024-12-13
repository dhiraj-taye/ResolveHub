import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import connectDB from "./config/mongodb.js"
import userRouter from "./routes/userRoute.js";
import complaintRouter from "./routes/complaintRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));
connectDB();

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter)
app.use("/api/complaint", complaintRouter)

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
