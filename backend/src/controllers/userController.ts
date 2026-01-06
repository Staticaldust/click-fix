import { Request, Response } from "express";
import User from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      include: [
        {
          association: "reviews",
          include: ["employee"],
        },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(Number(id), {
      include: [
        {
          association: "reviews",
          include: ["employee"],
        },
      ],
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const getUserByEmail = (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) {
      res.status(400).json({ message: "email query parameter required" });
      return;
    }

    // Query users by email if needed
    res.status(200).json(null);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const getUserByUsername = (req: Request, res: Response) => {
  try {
    const { username } = req.query;
    if (!username) {
      res.status(400).json({ message: "username query parameter required" });
      return;
    }

    // Query users by username if needed
    res.status(200).json(null);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const createUser = (req: Request, res: Response) => {
  try {
    const { username, email, address, image } = req.body;

    if (!username || !email || !address) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Create user handler would go here if needed
    res.status(201).json({});
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const updateUser = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Update user handler would go here if needed
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete user handler would go here if needed
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
