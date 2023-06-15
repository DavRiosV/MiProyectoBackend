import manager from "../managers/Cart.js";

const navbarData = async (req, res, next) => {
	const cart = await manager.getCartById(1);

	const products_quantity = cart.carts.reduce((acc, cart) => {
		return (acc += cart.quantity);
	}, 0);

	res.locals.products_quantity = products_quantity;

	next();
    console.log(products_quantity)
};

export default navbarData;
