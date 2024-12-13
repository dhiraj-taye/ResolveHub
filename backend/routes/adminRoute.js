import express from 'express';
import { complaintsAdmin, deleteComplaint, loginAdmin, updateComplaintStatus } from '../controllers/adminController.js';
import authAdmin from '../middleware/authAdmin.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin)
adminRouter.get('/all-complaints', authAdmin, complaintsAdmin)
adminRouter.put("/complaints/:complaintId", authAdmin, updateComplaintStatus);
adminRouter.delete("/complaints/:complaintId", deleteComplaint);

export default adminRouter