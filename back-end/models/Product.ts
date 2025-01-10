// Product model


import { DataTypes, Model } from 'sequelize';
import { db } from '../config/db';

class Product extends Model {
  // No need to declare class fields explicitly
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment setting for id
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Product',
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export { Product };
