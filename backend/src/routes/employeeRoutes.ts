import { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router = Router();

// GET all employees
router.get("/", employeeController.getAllEmployees);

// GET employee by ID
router.get("/:id", employeeController.getEmployeeById);

export default router;
