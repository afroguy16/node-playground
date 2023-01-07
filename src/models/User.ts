import SequelizedUser from "../services/database/User";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
}

class User {
  async getWrappedUser(id: number) {
    return await SequelizedUser.findByPk(id);
  }

  async getUser(id: number) {
    return await SequelizedUser.findAll({
      where: {
        id,
      },
      raw: true,
    });
  }

  async getAllUsers() {
    return await SequelizedUser.findAll({ raw: true });
  }

  async create(payload: Omit<UserAttributes, "id">) {
    return await SequelizedUser.create(payload, { raw: true });
  }

  async update(payload: UserAttributes) {
    return await SequelizedUser.update(payload, {
      where: {
        id: payload.id,
      },
    });
  }

  async delete(id: number) {
    return await SequelizedUser.destroy({
      where: {
        id,
      },
    });
  }
}

export default new User();
