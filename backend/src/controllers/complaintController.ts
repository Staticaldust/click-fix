import { Request, Response } from 'express';
import Complaint from '../models/Complaint';

export const getComplaints = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    let whereCondition: any = {};
    if (userRole !== 'admin') {
      whereCondition.userId = userId;
    }

    const complaints = await Complaint.findAll({
      where: whereCondition,
      include: [
        { model: require('../models/User').default, as: 'user', attributes: ['id', 'firstName', 'lastName'] },
        { model: require('../models/Employee').default, as: 'targetProfessional', attributes: ['id', 'firstName', 'lastName'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints' });
  }
};

export const getComplaintById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findByPk(id, {
      include: [
        { model: require('../models/User').default, as: 'user' },
        { model: require('../models/Employee').default, as: 'targetProfessional' },
        { model: require('../models/User').default, as: 'resolvedByUser', attributes: ['id', 'firstName', 'lastName'] },
      ],
    });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaint' });
  }
};

export const createComplaint = async (req: Request, res: Response) => {
  try {
    const { type, targetProfessionalId, subject, content } = req.body;
    const userId = (req as any).user.id;

    const complaint = await Complaint.create({
      userId,
      type,
      targetProfessionalId,
      subject,
      content,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Error creating complaint' });
  }
};

export const updateComplaint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, adminNotes, resolvedBy } = req.body;

    const complaint = await Complaint.findByPk(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    const updateData: any = { status };
    if (adminNotes) updateData.adminNotes = adminNotes;
    if (resolvedBy) {
      updateData.resolvedBy = resolvedBy;
      updateData.resolvedAt = new Date();
    }

    await complaint.update(updateData);
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Error updating complaint' });
  }
};