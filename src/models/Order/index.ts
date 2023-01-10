import { WriteResponse } from "../../utils/interfaces";

import { Status } from "./enums";
import { OrderAttributes, OrderModel } from "./interfaces";
import OrderService from "./Order.Service";

class Order implements OrderModel {
  async create(
    payload: Omit<OrderAttributes, "_id" | "status" | "createdAt">
  ): Promise<WriteResponse> {
    return OrderService.create(payload);
  }

  async get(userId: string): Promise<Array<OrderAttributes>> {
    return OrderService.get(userId);
  }

  async getOne(orderId: string): Promise<OrderAttributes | null> {
    return OrderService.getOne(orderId);
  }

  async updateStatus(orderId: string, status: Status): Promise<any> {
    return OrderService.updateStatus(orderId, status);
  }
}

export default new Order();
