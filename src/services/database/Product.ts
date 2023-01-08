import Sequelize, { Model, Optional } from "sequelize";
import { ProductAttributes } from "../../models/Product/Product";
// import sequelize from "../../utils/database";

class SequelizedProduct extends Model<
  ProductAttributes,
  Optional<ProductAttributes, "_id">
> {
  _id;
  title;
  imageUrl;
  description;
  price;
}

// SequelizedProduct.init(
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     title: {
//       type: Sequelize.STRING,
//     },
//     price: {
//       type: Sequelize.DOUBLE,
//       allowNull: false,
//     },
//     imageUrl: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: true,
//     // sequelize,
//     tableName: "products",
//   }
// );

export default SequelizedProduct;
