import { Types } from "mongoose";

import { WriteResponse } from "../../../../utils/interfaces";
import CartProviderProviderBase from "./base/Cart.ProviderBase.Service";

export default class CartMongooseProviderService extends CartProviderProviderBase {
  async delete(userId: string, productId: string): Promise<WriteResponse> {
    const id = new Types.ObjectId(productId).toString();
    return super.delete(userId, id);
  }
}
