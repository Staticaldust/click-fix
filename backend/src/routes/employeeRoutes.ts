import { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

// GET all employees
router.get("/", employeeController.getAllEmployees);

// GET employee by ID
router.get("/:id", employeeController.getEmployeeById);

// POST create employee
router.post("/", employeeController.createEmployee);

// PUT update employee
router.put("/:id", employeeController.updateEmployee);

// DELETE employee
router.delete("/:id", employeeController.deleteEmployee);

export default router;
