import fs from "fs";

class cartManager {
	constructor(path) {
		this.carts = [];
		this.path = path;
		this.init(path);
	}

	init(path) {
		let file = fs.existsSync(path);

		if (!file) {
			try {
				fs.writeFileSync(path, "[]");
			} catch (error) {
				throw "There was a problem creating cart manager file";
			}
		} else {
			try {
				let data = fs.readFileSync(this.path, "utf-8");
				this.carts = JSON.parse(data);
			} catch (error) {
				throw "There was a problem reading cart manager file";
			}
		}
	}

	async add_cart() {
		try {
			let id = 0;
			if (this.carts.length === 0) {
				id = 1;
			} else {
				let lastCart = this.carts[this.carts.length - 1];
				id = lastCart.id + 1;
			}
			let cart = {
				id,
				products: [],
			};
			this.carts.push(cart);
			await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 1));
			return cart;
		} catch (error) {
			throw `addCart: ${error}`;
		}
	}
	async getCarts(quantity) {
		try {
			if (this.carts.length === 0) {
				throw "Not found";
			}
			if (quantity) {
				return this.carts.slice(0, quantity);
			} else {
				return this.carts;
			}
		} catch (error) {
			throw `getCarts: ${error}`;
		}
	}
	async getCartById(cid) {
		try {
			let cart = this.carts.find((cart) => cart.id === cid);
			if (cart) {
				return cart;
			} else {
				throw "Not found";
			}
		} catch (error) {
			throw `getCartById: ${error}`;
		}
	}
	async update_cart({ cid, product_data }) {
		try {
			const { pid, quantity } = product_data;
			const cart = await this.getCartById(cid);
			const product = cart.products.find((product) => product.pid === pid);
			const validProps = ["pid", "quantity"];
			for (const prop in product_data) {
				if (!validProps.includes(prop)) {
					throw `wrong data sent '${prop}`;
				}
			}
			if (product) {
				product.quantity = quantity;
			} else {
				const product_data = {
					pid,
					quantity,
				};
				cart.products.push(product_data);
			}
			fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 1));
			return cart;
		} catch (error) {
			throw `updateCart: ${error}`;
		}
	}
	async destroy_cart(cid) {
		try {
			await this.getCartById(cid);
			const carts = this.carts.filter((cart) => cart.id !== cid);
			await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 1));
		} catch (error) {
			throw `deleteCart: ${error}`;
		}
	}
	async deleteProductCart({ cid, product_data }) {
		try {
			const { pid, quantity } = product_data;
			const cart = await this.getCartById(cid);
			const product = cart.products.find((product) => product.pid === pid);
			const validProps = ["pid", "quantity"];
			for (const prop in product_data) {
				if (!validProps.includes(prop)) {
					throw `wrong data sent '${prop}`;
				}
			}
			if (quantity === product.quantity) {
				const filtered_products = cart.products.filter(
					(product) => product.pid !== pid
				);
				cart.products = filtered_products;
				fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 1));
				return cart;
			}
			if (product) {
				product.quantity = product.quantity - quantity;
			}
			await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 1));
			return cart;
		} catch (error) {
			throw `updateCart: ${error}`;
		}
	}
}

let manager = new cartManager('./src/data/carts.json')

export default manager;
