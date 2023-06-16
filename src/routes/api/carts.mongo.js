/////////////////////////////
// IMPORTS
/////////////////////////////
import { Router } from "express";
import manager from "../../managers/Cart.js";
import producto from "../../managers/products.js";
import Cart from "../../../models/Cart.js";
import Product from "../../../models/Products.js";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const carts = await Cart.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId("648276ab74476c69be6576b3") } },
			{ $unwind: "$products" },
			{
					$lookup: {
							from: "products",
							localField: "products.product_id",
							foreignField: "_id",
							as: "product"
					}
			},
			{ $unwind: "$product" },
			{
					$set: {
							total: { $multiply: ["$products.quantity", "$product.price"] }
					}
			},
			{
					$group: {
							_id: "$_id",
							sum: { $sum: "$total" },
							products: { $push: "$product" }
					}
			},
			{
					$project: {
							_id: 0,
							cart_id: "$_id",
							sum: 1,
							products: "$products"
					}
			}
	]);
		console.log(carts);
		res.status(200).json({
			status: 200,
			success: true,
			products: carts[0].products,
			total: carts[0].sum
		});
	} catch (error) {
		next(error);
	}
});

router.get("/:cid", async (req, res, next) => {
	try {
		let cid = parseInt(req.params.cid);
		let cart = await Cart.find({ _id: cid });
		res.json({
			status: 200,
			success: true,
			cart,
		});
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		console.log("entra aca en el post");
		console.log(req.body);
		const cart = await Cart.create(req.body);
		res.json({
			status: 200,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

router.put("/:cid/product/:pid/:units", async (req, res, next) => {
	try {
		const cid = req.params.cid;
		const product_id = req.params.pid;
		const product_quantity = req.params.units;
		if (product_quantity <= 0) {
			const error = new Error(`Invalid product_quantity: ${product_quantity}`);
			error.status = 422;
			throw error;
		}
		let cart = await Cart.findById(cid);
		let product = await Product.findById(product_id);
		let product_cart = cart.products.find(
			(product) => product.product_id.toString() === product_id
		);
		if (product_quantity > product.stock) {
			const error = new Error(`There are only ${product.stock} items in cart`);
			error.status = 422;
			throw error;
		}
		if (!product_cart) {
			const actual_stock = product.stock - product_quantity;
			product = await Product.findByIdAndUpdate(
				{ _id: product_id },
				{ stock: actual_stock },
				{ new: true }
			);
			cart.products.push({ product_id: product._id, quantity: product_quantity });
			cart.save();
		} else {
			const total_units = product_cart.quantity + product.stock;
			const actual_stock = total_units - product_quantity;
			product = await Product.findByIdAndUpdate(
				{ _id: product_id },
				{ stock: actual_stock },
				{ new: true }
			);
			product_cart.quantity = product_quantity;
			cart.save();
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
		const cid = req.params.cid;
		const product_id = req.params.pid;
		let cart = await Cart.findById(cid);
		let product = await Product.findById(product_id);
		let product_cart = cart.products.find(
			(product) => product.product_id.toString() === product_id
		);

		const total_units = product_cart.quantity + product.stock;
		await Cart.updateOne(
			{ _id: cid },
			{ $pull: { products: { product_id: product_id } } }
		);
		product = await Product.findByIdAndUpdate(
			{ _id: product_id },
			{ stock: total_units },
			{ new: true }
		);
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

router.get("/bills/:cid", async (req, res, next) => {
	try {
		const carts = await Cart.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(req.params.cid) } },
			{ $unwind: "$products" },
			{
					$lookup: {
							from: "products",
							localField: "products.product_id",
							foreignField: "_id",
							as: "product"
					}
			},
			{ $unwind: "$product" },
			{
					$set: {
							total: { $multiply: ["$products.quantity", "$product.price"] }
					}
			},
			{
					$group: {
							_id: "$_id",
							sum: { $sum: "$total" },
							products: { $push: "$product" }
					}
			},
			{
					$project: {
							_id: 0,
							cart_id: "$_id",
							sum: 1,
							products: "$products"
					}
			}
	]);
		console.log(carts);
		res.status(200).json({
			status: 200,
			success: true,
			message: 'success',
			total: carts[0],
		});
	} catch (error) {
		next(error);
	}
});

export default router;