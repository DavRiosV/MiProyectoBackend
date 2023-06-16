import { Router } from "express";
import manager from "../../managers/Cart.js";
import producto from "../../managers/products.js";
const router = Router()

router.post("/", async (req, res, next) => {
	try {
		let response = await manager.add_cart();
		res.json({
			status: 200,
			success: true,
			response,
		});
	} catch (error) {
		next(error);
	}
});
router.get("/", async (req, res, next) => {
	try {
		let carts = await manager.getCarts();
		res.json({
			status: 200,
			success: true,
			message: `There are ${carts.length} carts`,
			carts,
		});
	} catch (error) {
		next(error);
	}
});
router.get('/:cid', async(req,res,next)=> {
    try {
        let id = Number(req.params.cid)
        let one = manager.getCartById(id)
        res.json({ 
            status:200,
            success: true,
        one});
        }catch(error) {
        next(error)
    }
})
router.put("/:cid/product/:pid/:units", async (req, res, next) => {
	try {
		const cid = Number(req.params.cid);
		const product_id = Number(req.params.pid);
		const product_quantity = Number(req.params.units);
		let product = await producto.getProductById(product_id);
		let cart = await manager.getCartById(cid);

		if (product_quantity <= 0) {
			const error = new Error(`Invalid product_quantity: ${product_quantity}`);
			error.status = 422;
			throw error;
		}

		let cart_products = cart.products.find(
			(product) => product.pid === product_id
		);

		if (!cart_products) {

			const product_data = {
				pid: product_id,
				quantity: product_quantity,
			};

			cart = await manager.updateCart({ cid, product_data });
			console.log("cart ", cart);

			console.log("BEFORE  ", product);
			product = await producto.updateProduct(product_id, {
				stock: product.stock - product_quantity,
			});

			console.log("after ", product);
		} else {
			let totalUnits = Number(product.stock) + Number(cart_products.quantity);
			if (product_quantity <= totalUnits) {

				const product_data = {
					pid: product_id,
					quantity: product_quantity,
				};

				cart = await manager.update_cart({ cid, product_data });

				console.log("BEFORE  ", product);

				product = await producto.updateProduct(product_id, {
					stock: totalUnits - product_quantity,
				});

				console.log("AFTER  ", product);
			} else {
				let error = new Error(
					`Not enough stock. There are ${product.stock} units available`
				);
				error.status = 422;
				throw error;
			}
		}

		return res.json({
			status: 200,
			success: true,
			cart,
			stock: `There are ${product.stock} units available`,
		});
	} catch (error) {
		next(error);
	}
});
router.delete("/:cid/product/:pid/:units", async (req, res, next) => {
	try {
		const cid = Number(req.params.cid);
		const product_id = Number(req.params.pid);
		const product_quantity = Number(req.params.units);
		let product = await producto.getProductById(product_id);
		let cart = await manager.getCartById(cid);

		if (product_quantity <= 0) {
			const error = new Error(`Invalid product_quantity: ${product_quantity}`);
			error.status = 422;
			throw error;
		}

		const product_cart = cart.products.find(
			(product) => product.pid === product_id
		);

		if (!product_cart) {
			const error = new Error(`Invalid id product id: ${product_id}`);
			error.status = 422;
			throw error;
		}

		if (product_cart.quantity - product_quantity >= 0) {
		
			const product_data = {
				pid: product_id,
				quantity: product_quantity,
			};
			cart = await manager.destroy_cart({ cid, product_data });

			product = await producto.updateProduct(product_id, {
				stock: Number(product.stock) + Number(product_quantity),
			});
		} else {
			const error = new Error(
				`There are ${product_cart.quantity} items in cart, cannot delete ${product_quantity} items`
			);
			error.status = 422;
			throw error;
		}

		res.json({
			status: 200,
			success: true,
			cart,
			stock: `There are ${product.stock} units in stock`,
		});
	} catch (error) {
		next(error);
	}
});

export default router