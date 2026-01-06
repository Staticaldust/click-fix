import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Review extends Model {
  declare id: number;
  declare userId: number | null;
  declare employeeId: number | null;
  declare categoryId: number | null;
  declare priceRate: number | null;
  declare serviceRate: number | null;
  declare performanceRate: number | null;
  declare comment: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'user_id',
      references: { model: 'users', key: 'id' },
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'employee_id',
      references: { model: 'employees', key: 'id' },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'category_id',
      references: { model: 'categories', key: 'id' },
    },
    priceRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'price_rate',
    },
    serviceRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'service_rate',
    },
    performanceRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'performance_rate',
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
  }
);

export default Review;
