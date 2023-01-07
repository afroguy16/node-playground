import Cart from "./Cart";

class Order {
  async createOrder(user, cart) {
    const cartProducts = await Cart.getAllProducts(cart);
    // add quantity to the products before attaching it to the order
    const updatedCartProducts = cartProducts.map((product) => {
      product.SequelizedOrdersProducts = {
        quantity: product.SequelizedCartsProducts.quantity,
      };
      return product;
    });

    // create a new order then attach the updated products to the order
    const newOrder = await user.createSequelizedOrder();
    await newOrder.addSequelizedProduct(updatedCartProducts);

    // clear the cart
    await cart.setSequelizedProducts(null);

    // return the newly created order
    return newOrder;
  }

  async getAllOrders(user) {
    return await user.getSequelizedOrders({ include: ["SequelizedProducts"] });
  }
}

export default new Order();
