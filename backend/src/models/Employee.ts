import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Employee extends Model {
  declare id: number;
  declare name: string;
  
  declare area: string | null;
  declare gender: string | null;
  declare email: string | null;
  declare password: string | null;
  declare phone: string;
  declare lastEntrance: Date | null;
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees',
  }
);

export default Employee;
