import { Router } from "express"
import producto from "../../managers/Products.js";
import { __dirname } from "../../utils.js"; 

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		let products = await producto.getProducts();
		return res.render(
			'products',
			{
			products: products,
			title: "Products",
			script: "products.js"
		});
	} catch (error) {
		next(error);
	}
});

router.get("/new_product", async (req, res, next) => {
	try {
		return res.render("new_product", {
			title: "Add product to cart",
			script: "new_product.js",
		});
	} catch (error) {
		next(error);
	}
});

router.get("/:pid", async (req, res, next) => {
	try {
		const product_id = Number(req.params.pid);
		const product = await producto.getProductById(product_id);

		return res.render("add-productsc", {
			title: "products-details",
			script: "product-details.js",
			product,
		});
	} catch (error) {
		next(error);
	}
});

export default router;
