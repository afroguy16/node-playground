import { Status } from "./enums";
import { OrderAttributes, OrderModel, WriteResponse } from "./interfaces";
import OrderService from "./Order.Service";

class Order implements OrderModel {
  async add(
    payload: Omit<OrderAttributes, "_id" | "status" | "createdAt">
  ): Promise<WriteResponse> {
    return OrderService.add(payload);
  }

  async get(userId: string): Promise<Array<OrderAttributes>> {
    return OrderService.get(userId);
  }

  async getOne(orderId: string): Promise<OrderAttributes> {
    return OrderService.getOne(orderId);
  }

  async updateStatus(orderId: string, status: Status): Promise<any> {
    return OrderService.updateStatus(orderId, status);
  }
}

export default new Order();
