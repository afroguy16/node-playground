import Sequelize, { Model, Optional } from "sequelize";

import sequelize from "../../utils/database";

interface CartAttributes {
  id: number;
}

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
