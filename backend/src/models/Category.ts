import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Category extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare image: string;
  declare fatherCategory: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fatherCategory: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'father_category',
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    // rely on global define.timestamps and underscored
  }
);

export default Category;
