import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

// GET all users
router.get("/", userController.getAllUsers);

// GET user by ID
router.get("/:id", userController.getUserById);

export default router;
