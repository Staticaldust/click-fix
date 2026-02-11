import { Router } from "express";
import * as userController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

// GET all users
router.get("/", userController.getAllUsers);

// GET user by ID
router.get("/:id", userController.getUserById);

// POST create user
router.post("/", userController.createUser);

// PUT update user
router.put("/:id", userController.updateUser);

// DELETE user
router.delete("/:id", userController.deleteUser);

export default router;
