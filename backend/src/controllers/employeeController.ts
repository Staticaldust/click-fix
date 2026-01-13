import { Request, Response } from "express";
import Employee from "../models/Employee";

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.findAll({
      include: [
        {
          association: "categories",
          through: { attributes: [] },
        },
        {
          association: "reviews",
          include: ["user"],
        },
      ],
    });
    res.status(200).json(employees);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error fetching employees", error });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(Number(id), {
      include: [
        {
          association: "categories",
          through: { attributes: [] },
        },
        {
          association: "reviews",
          include: ["user"],
        },
      ],
    });
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
};

export const getEmployeesByCategory = (req: Request, res: Response) => {
  try {
    const { categoryId } = req.query;
    if (!categoryId) {
      res.status(400).json({ message: "categoryId query parameter required" });
      return;
    }

    // This endpoint would query employees by category if needed
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

export const getEmployeesByArea = (req: Request, res: Response) => {
  try {
    const { area } = req.query;
    if (!area) {
      res.status(400).json({ message: "area query parameter required" });
      return;
    }

    // This endpoint would query employees by area if needed
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

export const getEmployeesByRating = (req: Request, res: Response) => {
  try {
    const { minRating } = req.query;
    if (!minRating) {
      res.status(400).json({ message: "minRating query parameter required" });
      return;
    }

    // This endpoint would query employees by rating if needed
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

export const createEmployee = (req: Request, res: Response) => {
  try {
    const { name, image, area, categoryId, gender, email, phone } = req.body;

    if (!name || !area || !categoryId || !gender || !email || !phone) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Create employee handler would go here if needed
    res.status(201).json({});
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
};

export const updateEmployee = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Update employee handler would go here if needed
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

export const deleteEmployee = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete employee handler would go here if needed
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};
