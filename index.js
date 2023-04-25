class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }
    
    addProduct({title, description, price, thumbnail, stock}) {
        let id = 0;
        if (this.products.length===0) {
            id = 1
        } else {
            let lastProducts = this.products[this.products.length-1]
            id = lastProducts.id + 1 
            }
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            stock,
        };
        this.products.push(product);
    }
    
    getProducts() {
        return this.products;
    }
    
    getProductById(id) {
        const product = this.products.find((products) => products.id === id);
        if (product) {
            return product;
        } else {
            console.error("Not found");
            return null;
        }
    }
    
    updateProduct(updatedProduct) {
        const index = this.products.findIndex((product) => product.id === updatedProduct.id);
        if (index !== -1) {
            this.products[index] = updatedProduct;
        } else {
            console.error("Product not found");
        }
    }
    deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            console.log("holi entre")
            this.products.splice(index, 1);
        } else {
            console.error("Product not found");
        }
    }
}

let producto = new ProductManager();

producto.addProduct({title:'Peluche Pikachu', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/pikachu.jpg?alt=media&token=c0be09a8-e126-4943-9b6f-f68c52fd5d8c', stock:100})
producto.addProduct({title:'Pikachu durmiendo', description:'Peluche de 30 cm de alto', price: 20000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/pikachu-durmiendo.jpeg?alt=media&token=0ccc3ea1-8a1f-4d2e-a92b-5457d1cfbe1f', stock:100})
producto.addProduct({title:'Pareja kimono', description:'Peluche de 30 cm de alto', price: 20000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/couple.jpg?alt=media&token=1297e212-66c3-4e15-9000-6a6b3e87072f', stock:100})
producto.addProduct({title:'Peluche Charmander', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/charmander.jpg?alt=media&token=75ae47b4-9cad-4c4f-b741-db7807aaed28', stock:100})
producto.addProduct({title:'Peluche Charmeleon', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/charmeleon.jpg?alt=media&token=ee73dc95-dfa9-4152-926d-559461a32174', stock:100})
producto.addProduct({title:'Peluche Charizard', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/charizard.jpg?alt=media&token=8528930b-d36f-48ae-9d05-486b2e540b3b', stock:100})
producto.addProduct({title:'Holiday Bulbasaur', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/holiday-bulbasaur.jpg?alt=media&token=96bd993f-ab43-4ea6-a2ca-4fbcecf3a4c9', stock:100})
producto.addProduct({title:'Peluche Ivysaur', description:'Peluche de 50 cm de alto', price: 35000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/ivysaur.jpg?alt=media&token=07f55965-deb8-42f9-9699-f7a52eca3b68', stock:100})
producto.addProduct({title:'Peluche Venasaur', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/venasaur.jpeg?alt=media&token=90b78914-2919-4e3a-aee0-5f3fa828fe17', stock:100})
producto.addProduct({title:'Peluche Squirtle', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/squirtle.jpeg?alt=media&token=aacbc186-038a-45cb-839e-6aee83f781dc', stock:100})
producto.addProduct({title:'Peluche Wartortle', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/wartortle.jpeg?alt=media&token=5af9c7f9-10aa-4b5c-8011-e6670630285b', stock:100})
producto.addProduct({title:'Peluche Blastoise', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/blastoise.jpg?alt=media&token=6feead39-6c8d-4d3e-94fd-5291fb5bc0a1', stock:100})
console.log(producto.getProducts())
console.log(producto.addProduct({title:'Peluche Pikachu', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/pikachu.jpg?alt=media&token=c0be09a8-e126-4943-9b6f-f68c52fd5d8c', stock:100}))
console.log(producto.getProductById(5))
producto.updateProduct({id:5, title:'Peluche Alfredo', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/charmeleon.jpg?alt=media&token=ee73dc95-dfa9-4152-926d-559461a32174', stock:100})
console.log(producto.getProductById(5))
producto.deleteProduct(5)
console.log(producto.getProducts())