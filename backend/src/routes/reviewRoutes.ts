import { Router } from "express";
import * as reviewController from "../controllers/reviewController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();
router.use(authMiddleware);

// GET all reviews
router.get("/", reviewController.getAllReviews);

// GET review by ID
router.get("/:id", reviewController.getReviewById);

// POST create review
router.post("/", reviewController.createReview);

// PUT update review
router.put("/:id", reviewController.updateReview);

// DELETE review
router.delete("/:id", reviewController.deleteReview);

export default router;
