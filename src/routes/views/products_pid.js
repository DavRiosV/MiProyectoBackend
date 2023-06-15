// import { Router } from "express";
// import product_manager from "../../Manager/Product_manager";
// 	const router = Router();

// router.get("cards/:pid", async (req, res, next) => {
// 	try {
	
// 		const product_id = Number(req.params.cid);
// 		const product = await product_manager.getProducts(product_id);

// 		const products_data_promises = product.products.map(async (product) => {
// 		const product_promise = await product_manager.getProductById(product.pid);

// 		return{
// 			id: id,
// 			pid: product.pid,
// 			title: product_promise.title,
// 			description: product_promise.description,
// 			thumbnail: product_promise.thumbnail,
// 			price: product_promise.price,
// 			quantity: product.quantity,
// 		};
// 	});

// const products_data = await Promise.all(products_data_promises);

// return res.render("products/:pid", {
// 	title: "Product id",
// 	products_data,
// 	script_cart: "pid.js",
// });
// } catch (error) {
// 	next(error);
// }
// });

// router.get("/products/:pid", async (req, res, next) => {
// try {

// 	const cart = await cart_manager.getCarts(9999);

// 	const products_data_promises = cart.products.map(async (product) => {
// 		const product_promise = await product_manager.getProductById(product.pid);

// 		return {
// 			cid: cart_id,
// 			pid: product.pid,
// 			title: product_promise.title,
// 			description: product_promise.description,
// 			thumbnail: product_promise.thumbnail,
// 			price: product_promise.price,
// 			quantity: product.quantity,
// 		};
// 	});

// 	const products_data = await Promise.all(products_data_promises);

// 	return res.render("products/:pid", {
// 		title: "Product ID",
// 		products_data,
// 		script_cart: "pid.js",
// 	});
// } catch (error) {
// 	next(error);
// }
// });


// export default router;

