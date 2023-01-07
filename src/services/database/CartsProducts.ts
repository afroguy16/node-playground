import Sequelize, { Model, Optional } from "sequelize";

import sequelize from "../../utils/database";

interface CartsProductsAttributes {
  id: number;
  quantity: number;
}

class SequelizedCartsProducts extends Model<
  CartsProductsAttributes,
  Optional<CartsProductsAttributes, "id">
> {
  id;
}

SequelizedCartsProducts.init(
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
    tableName: "cartsProducts",
  }
);

export default SequelizedCartsProducts;
