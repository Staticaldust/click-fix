import { Request, Response } from 'express';
import Chat from '../models/Chat';
import Message from '../models/Message';
import { Op } from 'sequelize';

export const getChats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    let whereCondition: any = {};
    if (userRole === 'customer') {
      whereCondition.customerId = userId;
    } else if (userRole === 'professional') {
      whereCondition.professionalId = userId;
    }

    const chats = await Chat.findAll({
      where: whereCondition,
      include: [
        { model: Message, as: 'lastMessage' },
        { model: require('../models/User').default, as: 'customer', attributes: ['id', 'firstName', 'lastName'] },
        { model: require('../models/Employee').default, as: 'professional', attributes: ['id', 'firstName', 'lastName'] },
      ],
      order: [['updatedAt', 'DESC']],
    });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chats' });
  }
};

export const getChatById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findByPk(id, {
      include: [
        { model: Message, as: 'messages', order: [['createdAt', 'ASC']] },
        { model: require('../models/User').default, as: 'customer' },
        { model: require('../models/Employee').default, as: 'professional' },
      ],
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat' });
  }
};

export const createChat = async (req: Request, res: Response) => {
  try {
    const { customerId, professionalId, quoteRequestId } = req.body;
    const chat = await Chat.create({ customerId, professionalId, quoteRequestId });
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, content, type = 'text', quoteData, imageUrl } = req.body;
    const senderId = (req as any).user.id;
    const senderType = (req as any).user.role === 'customer' ? 'customer' : 'professional';

    const message = await Message.create({
      chatId,
      senderId,
      senderType,
      type,
      content,
      quoteData,
      imageUrl,
    });

    // Update chat's lastMessage and updatedAt
    await Chat.update(
      { lastMessageId: message.id, updatedAt: new Date() },
      { where: { id: chatId } }
    );

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
};