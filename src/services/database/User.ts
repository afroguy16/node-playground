import Sequelize, { Model, Optional } from "sequelize";

import { UserAttributes } from "../../models/User";
import sequelize from "../../utils/database";

class SequelizedUser extends Model<
  UserAttributes,
  Optional<UserAttributes, "id">
> {
  id;
  name;
  email;
}

SequelizedUser.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: "users",
  }
);

export default SequelizedUser;
