import Sequelize, { Model, Optional } from "sequelize";

import sequelize from "../../utils/database";

interface OrdersProductsAttributes {
  id: number;
  quantity: number;
}

class SequelizedOrdersProducts extends Model<
  OrdersProductsAttributes,
  Optional<OrdersProductsAttributes, "id">
> {
  id;
}

SequelizedOrdersProducts.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: "ordersProducts",
  }
);

export default SequelizedOrdersProducts;
