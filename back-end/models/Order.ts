// Order model
import { DataTypes, Model } from 'sequelize';
import { db } from '../config/db';

class Order extends Model {
  // No need to declare class fields explicitly
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  },
  {
    sequelize: db,
    modelName: 'Order',
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export { Order };
