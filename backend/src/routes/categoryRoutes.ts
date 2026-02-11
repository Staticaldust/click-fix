import { Router } from "express";
import * as categoryController from "../controllers/categoryController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

// GET all categories
router.get("/", categoryController.getAllCategories);

// GET category by ID
router.get("/:id", categoryController.getCategoryById);

// POST create category
router.post("/", categoryController.createCategory);

// PUT update category
router.put("/:id", categoryController.updateCategory);

// DELETE category
router.delete("/:id", categoryController.deleteCategory);

export default router;
