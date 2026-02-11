import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Chat extends Model {
  declare id: number;
  declare customerId: number;
  declare professionalId: number;
  declare quoteRequestId: number | null;
  declare lastMessageId: number | null;
  declare unreadCount: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'customer_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    professionalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'professional_id',
      references: {
        model: 'employees',
        key: 'id',
      },
    },
    quoteRequestId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'quote_request_id',
      references: {
        model: 'quotes',
        key: 'id',
      },
    },
    lastMessageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'last_message_id',
      references: {
        model: 'messages',
        key: 'id',
      },
    },
    unreadCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'unread_count',
    },
  },
  {
    sequelize,
    modelName: 'Chat',
    tableName: 'chats',
    timestamps: true,
  }
);

export default Chat;