import { Router } from 'express';
import * as notificationController from '../controllers/notificationController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

// GET /api/notifications - Get user's notifications
router.get('/', notificationController.getNotifications);

// PUT /api/notifications/:id/read - Mark as read
router.put('/:id/read', notificationController.markAsRead);

// POST /api/notifications - Create notification (admin/internal)
router.post('/', notificationController.createNotification);

export default router;