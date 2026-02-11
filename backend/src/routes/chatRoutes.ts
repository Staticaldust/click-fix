import { Router } from 'express';
import * as chatController from '../controllers/chatController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

// GET /api/chats - Get user's chats
router.get('/', chatController.getChats);

// GET /api/chats/:id - Get chat by ID
router.get('/:id', chatController.getChatById);

// POST /api/chats - Create new chat
router.post('/', chatController.createChat);

// POST /api/chats/:id/messages - Send message
router.post('/:id/messages', chatController.sendMessage);

export default router;