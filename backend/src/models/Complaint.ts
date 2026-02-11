import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Complaint extends Model {
  declare id: number;
  declare userId: number;
  declare type: 'professional' | 'system' | 'other';
  declare targetProfessionalId: number | null;
  declare subject: string;
  declare content: string;
  declare status: 'open' | 'in_progress' | 'resolved' | 'closed';
  declare adminNotes: string | null;
  declare resolvedAt: Date | null;
  declare resolvedBy: number | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Complaint.init(
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
      type: DataTypes.ENUM('professional', 'system', 'other'),
      allowNull: false,
    },
    targetProfessionalId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'target_professional_id',
      references: {
        model: 'employees',
        key: 'id',
      },
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
      allowNull: false,
      defaultValue: 'open',
    },
    adminNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'admin_notes',
    },
    resolvedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'resolved_at',
    },
    resolvedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'resolved_by',
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Complaint',
    tableName: 'complaints',
    timestamps: true,
  }
);

export default Complaint;