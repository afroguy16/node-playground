import Sequelize, { Model, Optional } from "sequelize";
import { ProductState } from "../../models/Product";
import sequelize from "../../utils/database";

class SequelizedProduct extends Model<
  ProductState,
  Optional<ProductState, "id">
> {
  id;
  title;
  imageUrl;
  description;
  price;
}

SequelizedProduct.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: "products",
  }
);

export default SequelizedProduct;
