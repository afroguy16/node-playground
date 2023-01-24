import Stripe from "stripe";
import { CartWithCompleteProductAttributes } from "../../../../../models/Embedded/Cart/interfaces";

class StripeService {
  start() {
    return new Stripe(
      "sk_test_51MQcjIFaxzNV9iaNBn5zvu5kVNUXkyVz7TC2JZELkO1SUp0MZubxwLEf3kfayjKEiXGoHREphR2lj0tNcKYwqhaq00e32ErpBx",
      {
        apiVersion: "2022-11-15",
      }
    );
  }

  async createProductCheckoutSession(
    req,
    products: Array<CartWithCompleteProductAttributes>
  ) {
    return await this.start().checkout.sessions.create({
      success_url: `${req.protocol}://${req.get("host")}/checkout/success`,
      cancel_url: `${req.protocol}://${req.get("host")}/checkout/cancel`,
      mode: "payment",
      payment_method_types: ["card"],
      line_items: products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            description: product.description,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      })),
    });
  }
}

export default new StripeService();
