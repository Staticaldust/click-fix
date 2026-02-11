import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Employee extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;

  declare area: string | null;
  declare gender: string | null;
  declare email: string | null;
  declare password: string | null;
  declare phone: string;
  declare lastEntrance: Date | null;
  declare description: string | null;
  declare yearsOfExperience: number | null;
  declare workingHours: any; // JSON
  declare services: any; // JSON
  declare certificates: any; // JSON
  declare profileImage: string | null;
  declare status: 'pending' | 'approved' | 'rejected' | 'suspended';
  declare approvedAt: Date | null;
  declare approvedBy: number | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name',
    },
    area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lastEntrance: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_entrance',
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    yearsOfExperience: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'years_of_experience',
    },
    workingHours: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'working_hours',
    },
    services: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    certificates: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'profile_image',
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'suspended'),
      allowNull: false,
      defaultValue: 'pending',
    },
    approvedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'approved_at',
    },
    approvedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'approved_by',
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees',
  }
);

export default Employee;
