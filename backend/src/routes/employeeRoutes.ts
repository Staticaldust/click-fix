import { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

// GET all employees
router.get("/", employeeController.getAllEmployees);

// GET employee by ID
router.get("/:id", employeeController.getEmployeeById);

export default router;
