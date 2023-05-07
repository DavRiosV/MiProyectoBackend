import fs from 'fs'

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.init(path)
    }
    async init(path) {
        try{
            let file = fs.existsSync(path)
            if (!file) {
                fs.writeFileSync(path,'[]')
                console.log('file created at path: '+this.path)
                return 'file created at path: '+this.path
            } else {
        }
            this.carts = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        } catch(error){
            console.log(error)
            return null
        }
    } 
    async add_cart({ title, description, price, thumbnail, stock}) {
        try {
            let data = { title, description, price, thumbnail, stock }
            if (this.carts.length>0) {
                let next_id = this.carts[this.carts.length-1].id+1
                data.id = next_id
            } else {
                data.id = 1
            }
            this.carts.push(data)
            let data_json = JSON.stringify(this.carts,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('id´s created cart: '+data.id)
            return 201
        } catch(error) {
            console.log(error)
            return `addCart: error`
        }
    }
    getCarts() {
        return this.carts
    }
    getCartById(id) {
        let one = this.carts.find(each=>each.id===id)
        if (!one){
            console.log('Not found')
            return  
        } else {
            console.log('Finded cart:' + id)
            return one
        } 
    }
    async update_cart(id,data) {
        try {
            let one = this.getCartById(id)
            for (let prop in data) {
                one[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.carts,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('updated cart: '+id)
            return 200
        } catch(error) {
            console.log(error)
            return null
        }
    }
    async destroy_cart(id) {
        try {
            let one = this.carts.find(each=>each.id===id)
            if (one) {
                this.carts = this.carts.filter(each=>each.id!==id)
                let data_json = JSON.stringify(this.carts,null,2)
                await fs.promises.writeFile(this.path,data_json)
                console.log('delete cart: '+id)
                return 200
            }
            console.log('not found')
            return null
        } catch(error) {
            console.log(error)
            return null
        }
    }
}

let manager = new CartManager('./src/data/carts.json')
async function managerC(){

    await manager.add_cart({title:'Pikachu durmiendo', description:'Peluche de 30 cm de alto', price: 20000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/pikachu-durmiendo.jpeg?alt=media&token=0ccc3ea1-8a1f-4d2e-a92b-5457d1cfbe1f', stock:100})
    await manager.add_cart({title:'Pareja kimono', description:'Peluche de 30 cm de alto', price: 20000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/couple.jpg?alt=media&token=1297e212-66c3-4e15-9000-6a6b3e87072f', stock:100})
    await manager.add_cart({title:'Peluche Charmander', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/charmander.jpg?alt=media&token=75ae47b4-9cad-4c4f-b741-db7807aaed28', stock:100})
    await manager.add_cart({title:'Peluche Charmeleon', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/charmeleon.jpg?alt=media&token=ee73dc95-dfa9-4152-926d-559461a32174', stock:100})
    await manager.add_cart({title:'Peluche Charizard', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/charizard.jpg?alt=media&token=8528930b-d36f-48ae-9d05-486b2e540b3b', stock:100})
    await manager.add_cart({title:'Holiday Bulbasaur', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/holiday-bulbasaur.jpg?alt=media&token=96bd993f-ab43-4ea6-a2ca-4fbcecf3a4c9', stock:100})
    await manager.add_cart({title:'Peluche Ivysaur', description:'Peluche de 50 cm de alto', price: 35000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/ivysaur.jpg?alt=media&token=07f55965-deb8-42f9-9699-f7a52eca3b68', stock:100})
    await manager.add_cart({title:'Peluche Venasaur', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/venasaur.jpeg?alt=media&token=90b78914-2919-4e3a-aee0-5f3fa828fe17', stock:100})
    await manager.add_cart({title:'Peluche Squirtle', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/squirtle.jpeg?alt=media&token=aacbc186-038a-45cb-839e-6aee83f781dc', stock:100})
    await manager.add_cart({title:'Peluche Wartortle', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/wartortle.jpeg?alt=media&token=5af9c7f9-10aa-4b5c-8011-e6670630285b', stock:100})
    await manager.add_cart({title:'Peluche Blastoise', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/blastoise.jpg?alt=media&token=6feead39-6c8d-4d3e-94fd-5291fb5bc0a1', stock:100})
    console.log(manager.add_cart({title:'Peluche Pikachu', description:'Peluche de 30 cm de alto', price: 15000, thumbnail:'https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/pikachu.jpg?alt=media&token=c0be09a8-e126-4943-9b6f-f68c52fd5d8c', stock:100}))
    console.log(manager.getCarts())
    console.log(manager.getCartById(12))
}
// manager()
export default manager