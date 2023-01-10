import { WriteResponse } from "../../utils/interfaces";
import { CartWithCompleteProductAttributes } from "../Embedded/Cart/interfaces";
import { Status } from "./enums";

export interface OrderAttributes {
  _id: string;
  userId: string;
  products: Array<CartWithCompleteProductAttributes>;
  totalPrice: number;
  status: Status;
  createdAt: number;
}

export interface OrderModel {
  create: (payload: Omit<OrderAttributes, "status">) => Promise<WriteResponse>;
  get: (userId: string) => Promise<Array<OrderAttributes>>;
  getOne: (orderId: string) => Promise<OrderAttributes | null>;
  updateStatus: (orderId: string, status: Status) => Promise<any>;
}
