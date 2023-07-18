import fs from "fs";

class ProductManager {
	constructor(path) {
		this.products = [];
		this.path = path;
		this.init(path);
	}

	init(path) {
		let file = fs.existsSync(path);

		if (!file) {
			try {
				fs.writeFileSync(path, "[]");
			} catch (err) {
				throw "There was a problem creating a file";
			}
		} else {
			try {
				const data = fs.readFileSync(path, "utf-8");
				this.products = JSON.parse(data);
			} catch (err) {
				throw "There was a problem reading the file";
			}
		}
	}

	async add_product({ title, description, price, thumbnail, stock }) {
		try {
			let repeatedIndex = this.products.findIndex(
				(product) => product.title === title
			);
			if (repeatedIndex !== -1) {
				throw `This product '${title}' already exists at index ${repeatedIndex}`;
			}
			let id;
			if (this.products.length === 0) {
				id = 1;
			} else {
				let last_id = 0;
				this.products.forEach((product) => {
					if (product.id > last_id) {
						last_id = product.id;
					}
				});
				id = last_id + 1;
			}
			const new_product = {
				id,
				title,
				description,
				price,
				thumbnail,
				stock: stock ?? 10,
			};
			this.products.push(new_product);
			await fs.promises.writeFile(
				this.path,
				JSON.stringify(this.products, null, 2)
			);
			return new_product;
		} catch (error) {
			throw `addProduct: ${error}`;
		}
	}
	async getProducts(quantity) {
		try {
			if (this.products.length === 0) {
				throw "Not found";
			}
			return quantity ? this.products.slice(0, quantity) : this.products;
		} catch (error) {
			throw "getProducts: error";
		}
	}
	async getProductById(id) {
		try {
			const product = this.products.find((product) => product.id === id);
			if (product) {
				return product;
			} else {
				throw "Product not found";
			}
		} catch (error) {
			throw `getProductById: ${error}`;
		}
	}

	async updateProduct(id, data) {
		try {
			let product = await this.getProductById(id);
			console.log(product)
			if (Object.keys(data).length === 0) {
				throw "No data to update";
			}
			const validProps = ["title", "description", "price", "thumbnail", "stock"];
			for (const prop in data) {
				if (!validProps.includes(prop)) {
					throw `wrong data sent '${prop}`;
				}
				if (prop === "cid") {
					continue;
				}
				product[prop] = data[prop];
			}
			await fs.promises.writeFile(
				this.path,
				JSON.stringify(this.products, null, 2)
			);
			return product;
		} catch (error) {
			throw `updateProduct: ${error}`;
		}
	}
	async deleteProduct(id) {
		try {
			let product = await this.getProductById(id);
			this.products = this.products.filter((product) => product.id !== id);
			await fs.promises.writeFile(
				this.path,
				JSON.stringify(this.products, null, 2)
			);
			return `deleteProduct: product id:${product.id} deleted`;
		} catch (error) {
			throw `deleteProduct: ${error}`;
		}
	}
}

let producto = new ProductManager('./src/data/products.json');

export default producto;