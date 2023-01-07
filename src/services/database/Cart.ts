import Sequelize, { Model, Optional } from "sequelize";

import { CartAttributes } from "../../models/Cart";
import sequelize from "../../utils/database";

class SequelizedCart extends Model<
  CartAttributes,
  Optional<CartAttributes, "id">
> {
  id;
}

SequelizedCart.init(
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
    tableName: "carts",
  }
);

export default SequelizedCart;
