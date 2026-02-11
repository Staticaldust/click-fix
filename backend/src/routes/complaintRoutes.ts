import { Router } from 'express';
import * as complaintController from '../controllers/complaintController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

// GET /api/complaints - Get user's complaints
router.get('/', complaintController.getComplaints);

// GET /api/complaints/:id - Get complaint by ID
router.get('/:id', complaintController.getComplaintById);

// POST /api/complaints - Create new complaint
router.post('/', complaintController.createComplaint);

// PUT /api/complaints/:id - Update complaint (admin)
router.put('/:id', complaintController.updateComplaint);

export default router;