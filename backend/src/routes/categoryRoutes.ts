import { Router } from "express";
import * as categoryController from "../controllers/categoryController";

const router = Router();

// GET all categories
router.get("/", categoryController.getAllCategories);

// GET category by ID
router.get("/:id", categoryController.getCategoryById);

export default router;
