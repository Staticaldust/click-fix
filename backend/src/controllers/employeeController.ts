import { Request, Response } from "express";
import Employee from "../models/Employee";
import Quote from "../models/Quote";

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

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, area, gender, email, phone, description, yearsOfExperience, workingHours, services, certificates } = req.body;

    if (!firstName || !lastName || !phone) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const employee = await Employee.create({
      firstName,
      lastName,
      area,
      gender,
      email,
      phone,
      description,
      yearsOfExperience,
      workingHours,
      services,
      certificates,
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const employee = await Employee.findByPk(Number(id));
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    await employee.update(updates);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(Number(id));
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    await employee.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

// GET /api/employees/:id/stats - Get professional dashboard stats
export const getEmployeeStats = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(Number(id));
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(todayStart);
    monthStart.setMonth(monthStart.getMonth() - 1);

    // Count quotes by status
    const [pendingCount, respondedCount, acceptedCount, totalCount] = await Promise.all([
      Quote.count({ where: { professionalId: Number(id), status: 'pending' } }),
      Quote.count({ where: { professionalId: Number(id), status: 'responded' } }),
      Quote.count({ where: { professionalId: Number(id), status: 'accepted' } }),
      Quote.count({ where: { professionalId: Number(id) } }),
    ]);

    const conversionRate = totalCount > 0 ? Math.round((acceptedCount / totalCount) * 100) : 0;

    res.json({
      profileViews: {
        today: 0,
        week: 0,
        month: 0,
      },
      requests: {
        new: pendingCount,
        inProgress: respondedCount,
        completed: acceptedCount,
      },
      conversionRate,
    });
  } catch (error) {
    console.error("Error fetching employee stats:", error);
    res.status(500).json({ message: "Error fetching employee stats", error });
  }
};

// GET /api/employees/:id/recent-requests - Get recent quote requests for professional
export const getRecentRequests = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const limit = Number(req.query.limit) || 5;

    const quotes = await Quote.findAll({
      where: { professionalId: Number(id) },
      order: [['createdAt', 'DESC']],
      limit,
      include: [
        { association: 'customer', attributes: ['id', 'firstName', 'lastName'] },
        { association: 'category', attributes: ['id', 'name'] },
      ],
    });

    const requests = quotes.map((quote: any) => ({
      id: String(quote.id),
      customerId: String(quote.customerId),
      customerName: quote.customer
        ? `${quote.customer.firstName} ${quote.customer.lastName}`
        : quote.guestName || 'אורח',
      professionalId: String(quote.professionalId),
      professionalName: '',
      categoryId: String(quote.categoryId),
      answers: quote.answers || [],
      description: quote.description,
      urgency: quote.urgency,
      responseMethod: quote.responseMethod,
      status: quote.status,
      createdAt: quote.createdAt,
      respondedAt: quote.respondedAt,
    }));

    res.json(requests);
  } catch (error) {
    console.error("Error fetching recent requests:", error);
    res.status(500).json({ message: "Error fetching recent requests", error });
  }
};
