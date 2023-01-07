import Sequelize, { Model, Optional } from "sequelize";

import { CartsProductsAttributes } from "../../models/Cart";
import sequelize from "../../utils/database";

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
