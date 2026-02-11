import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Notification extends Model {
  declare id: number;
  declare userId: number;
  declare type: 'new_quote_request' | 'quote_response' | 'new_message' | 'new_review' | 'approval_status' | 'system';
  declare title: string;
  declare content: string;
  declare link: string | null;
  declare channels: string[]; // JSON array of 'system' | 'email' | 'sms'
  declare isRead: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    type: {
      type: DataTypes.ENUM('new_quote_request', 'quote_response', 'new_message', 'new_review', 'approval_status', 'system'),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    channels: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: ['system'],
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
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: true,
  }
);

export default Notification;