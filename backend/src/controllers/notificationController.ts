import { Request, Response } from 'express';
import Notification from '../models/Notification';

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { page = 1, limit = 20 } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    const notifications = await Notification.findAndCountAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: Number(limit),
      offset,
    });

    res.json({
      notifications: notifications.rows,
      total: notifications.count,
      page: Number(page),
      totalPages: Math.ceil(notifications.count / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const notification = await Notification.findOne({ where: { id, userId } });
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await notification.update({ isRead: true });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification' });
  }
};

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { userId, type, title, content, link, channels } = req.body;
    const notification = await Notification.create({ userId, type, title, content, link, channels });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification' });
  }
};