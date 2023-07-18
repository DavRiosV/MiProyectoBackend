// IMPORTS & VARIABLES
/////////////////////////////
import { Router } from "express";
import manager from "../../managers/cart.js";
import producto from "../../managers/Products.js";

const router = Router();

router.get("/:cid", async (req, res, next) => {
	try {
		const cart_id = Number(req.params.cid);
		if (isNaN(cart_id)) {
			throw new Error("Invalid cart ID");
		}
		const cart = await manager.getCartById(cart_id);
		const products_data_promises = cart.products.map(async (product) => {
			const product_promise = await producto.getProductById(product.pid);
			return {
				cid: cart_id,
				pid: product.pid,
				title: product_promise.title,
				description: product_promise.description,
				thumbnail: product_promise.thumbnail,
				price: product_promise.price,
				quantity: product.quantity,
				stock: product_promise.stock,
			};
		});
		
		const products_data = await Promise.all(products_data_promises);
		
		return res.render("cart", {
			title: "cart",
			products_data,
			script: "edit-cart.js",
		});
	} catch (error) {
		next(error);
	}
});

export default router;