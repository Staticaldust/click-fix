import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class EmployeeCategory extends Model {
  declare employeeId: number;
  declare categoryId: number;
}

EmployeeCategory.init(
  {
    employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'employee_id',
        references: {
          model: 'employees',
          key: 'id',
        },
    },
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'category_id',
        references: {
          model: 'categories',
          key: 'id',
        },
    },
  },
  {
    sequelize,
    modelName: 'EmployeeCategory',
    tableName: 'employee_categories',
    timestamps: false,
  }
);

export default EmployeeCategory;
