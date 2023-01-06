import { Sequelize } from "sequelize";

const host = "localhost";
const name = "node_playground";
const user = "root";
const password = "12345678";
const dialect = "mysql";

const sequelize = new Sequelize(name, user, password, { dialect, host });

export default sequelize;
