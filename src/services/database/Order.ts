import Sequelize, { Model, Optional } from "sequelize";

import sequelize from "../../utils/database";

interface OrderAttributes {
  id: number;
}

class SequelizedOrder extends Model<
  OrderAttributes,
  Optional<OrderAttributes, "id">
> {
  id;
}

SequelizedOrder.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: "orders",
  }
);

export default SequelizedOrder;
