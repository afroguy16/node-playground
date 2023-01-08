export interface UserAttributes {
  _id: string;
  name: string;
  email: string;
}

export interface UserModel {
  create: (payload: Omit<UserAttributes, "_id">) => Promise<any>;
  getAll: () => Promise<any>;
  get: (id: string) => Promise<any>;
  update: (payload: UserAttributes) => Promise<any>;
}
