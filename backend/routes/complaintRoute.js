import express from "express";
import {
  complaints,
  getComplaints,
} from "../controllers/complaintController.js";
import authUser  from "../middleware/authUser.js";

const complaintRouter = express.Router();

complaintRouter.post("/add", authUser, complaints);
complaintRouter.get("/mycomplaints", authUser, getComplaints)

export default complaintRouter;
