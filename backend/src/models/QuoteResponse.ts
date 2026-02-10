import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class QuoteResponse extends Model {
  declare id: number;
  declare quoteId: number;
  declare professionalId: number;
  declare price: number;
  declare availability: string;
  declare notes: string | null;
  declare validUntil: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

QuoteResponse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quoteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'quote_id',
      references: {
        model: 'quotes',
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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    validUntil: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'valid_until',
    },
  },
  {
    sequelize,
    modelName: 'QuoteResponse',
    tableName: 'quote_responses',
    timestamps: true,
  }
);

export default QuoteResponse;
