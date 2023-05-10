import fs from 'fs'

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.init(path)
    }

init(path) {
    let file = fs.existsSync(path)
    if (!file) {
        fs.writeFileSync(path,'[]')
        console.log('file created at path: '+this.path)
        return 'file created at path: '+this.path
    } else {
        this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
        console.log('data recovered')
        return 'data recovered'
    }
}
    
async add_product({title, description, price, thumbnail, stock}) {
    try {
        let data = {title, description, price, thumbnail, stock}
        if (this.products.length>0) {
            let next_id = this.products[this.products.length-1].id+1
            data.id = next_id
        } else {
            data.id = 1
            }
        this.products.push(data);
        let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            return data
        } catch(error) {
            console.log(error)
            return 'addProduct: error'
        }
    }
    
    getProducts() {
        try{
            if (this.products.length > 0) {
                return this.products;
            } else {
                console.error("Products Not found");
                return 'Products Not found';
            }
        } catch(error) {
            return 'getProducts: error'
        }
    }
    
    getProductById(id) {
        let one = this.products.find(each=>each.id===id)
        if (!one){
            console.log('error: not found')
            return null 
        } else {
            console.log('Finded products:' + id)
            return one
        } 
    }
    
    async updateProduct(id,data) {
        try {
            let one = this.getProductById(id)
            if (!one){
                console.log('error: Not found products to update')
                return 'error: Not found products to update'
            }
            if (Object.keys(data).length===0){
                console.log('Not found')
                return 'Not found'
            }
            for (let prop in data) {
                one[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('updated products: '+id)
            return 'updated products: '+id
        } catch(error) {
            console.log(error)
            return 'error: updating products' 
        }
    }
    async deleteProduct(id) {
        try {
            let one = this.getProductById(id)
            if (!one){
                console.log('error: Not found products to delete')
                return 'error: Not found products to delete'
            }
            this.products = this.products.filter(each=>each.id!==id)
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('deleteProduct: done delete id '+id)
            return 'Not found '+id
        } catch(error) {
            console.log(error)
            return 'deleteProduct: error'
        }
    }
}

let producto = new ProductManager('./src/data/products.json');

export default producto