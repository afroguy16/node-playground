export interface ProductAttributes {
  _id: string;
  userId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export interface ProductModel {
  create: (payload: Omit<ProductAttributes, "_id">) => Promise<any>;
  getAll: () => Promise<any>;
  get: (id: string) => Promise<any>;
  getMultiple: (ids: Array<string>) => Promise<any>;
  update: (payload: ProductAttributes) => Promise<any>;
  delete: (id: string) => Promise<any>;
}
