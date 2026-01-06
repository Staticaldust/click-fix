import { Router } from "express";
import * as reviewController from "../controllers/reviewController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();
router.use(authMiddleware);

// GET all reviews
router.get("/", reviewController.getAllReviews);

// GET review by ID
router.get("/:id", reviewController.getReviewById);

export default router;
