import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Message extends Model {
  declare id: number;
  declare chatId: number;
  declare senderId: number;
  declare senderType: 'customer' | 'professional';
  declare type: 'text' | 'quote' | 'image' | 'system';
  declare content: string;
  declare quoteData: any | null; // JSON for quote response
  declare imageUrl: string | null;
  declare isRead: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'chat_id',
      references: {
        model: 'chats',
        key: 'id',
      },
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'sender_id',
    },
    senderType: {
      type: DataTypes.ENUM('customer', 'professional'),
      allowNull: false,
      field: 'sender_type',
    },
    type: {
      type: DataTypes.ENUM('text', 'quote', 'image', 'system'),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    quoteData: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'quote_data',
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'image_url',
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_read',
    },
  },
  {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: true,
  }
);

export default Message;