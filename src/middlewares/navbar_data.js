import manager from "../managers/cart.js";

const navbar_data = async (req, res, next) => {

    let carts = await manager.getCarts();
    let products_quantity = carts.reduce((total, cart) => {
      return total + cart.products.reduce((sum, product) => {
        return sum + product.quantity;
      }, 0);
    }, 0);
    res.locals.products_quantity = products_quantity;
    next();
};

export default navbar_data;
