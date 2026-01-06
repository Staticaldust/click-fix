import { Router } from "express";
import * as reviewController from "../controllers/reviewController";

const router = Router();

// GET all reviews
router.get("/", reviewController.getAllReviews);

// GET review by ID
router.get("/:id", reviewController.getReviewById);

export default router;
