import { Router } from 'express';
import * as quoteController from '../controllers/quoteController';
import authMiddleware from '../middleware/authMiddleware';
import optionalAuthMiddleware from '../middleware/optionalAuthMiddleware';

const router = Router();

// POST /api/quotes - Create a new quote request (optional auth - supports both authenticated and guest users)
router.post('/', optionalAuthMiddleware, quoteController.createQuote);

// All other routes require authentication
router.use(authMiddleware);

// GET /api/quotes/my - Get customer's quotes
router.get('/my', quoteController.getMyQuotes);

// GET /api/quotes/incoming - Get professional's incoming requests
router.get('/incoming', quoteController.getIncomingRequests);

// GET /api/quotes/:id - Get a single quote
router.get('/:id', quoteController.getQuoteById);

// POST /api/quotes/:id/respond - Professional responds to quote
router.post('/:id/respond', quoteController.respondToQuote);

// POST /api/quotes/:id/accept - Customer accepts quote
router.post('/:id/accept', quoteController.acceptQuote);

// POST /api/quotes/:id/reject - Customer rejects quote
router.post('/:id/reject', quoteController.rejectQuote);

export default router;
