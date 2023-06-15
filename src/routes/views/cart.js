import { Router } from "express";
import producto from "../../managers/products.js";
import manager from "../../managers/Cart.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const cart_id = Number(req.params.cid);
		const cart = await manager.getCartById(cart_id);
		const products_data_promises = manager.carts.map(async (product) => {
		const product_promise = await producto.getProductById(product.pid);

			return {
				cid: cart_id,
				pid: product.pid,
				title: product.title,
				description: product.description,
				thumbnail: product.thumbnail,
				price: product.price,
				quantity: product.quantity,
				stock: product.stock,
			};
		});

		const products_data = await Promise.all(products_data_promises);

		return res.render("cart", {
			title: "Cart",
			products_data,
			script_cart: "cart.js",
		});
	} catch (error) {
		next(error);
	}
});

export default router;
