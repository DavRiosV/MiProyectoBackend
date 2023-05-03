import express from 'express'
import producto from './index.js'

let server = express()

let PORT = 8050

let ready = ()=>console.log('Server ready on port: '+PORT)

server.listen(PORT,ready)
server.use(express.urlencoded({extended:true}))

let index_route = '/'
let index_function = (req,res) => {
    let allProducts = producto.getProducts().length
    console.log(allProducts)
    return res.send(`There're ${allProducts} products`)
}
server.get(index_route,index_function) 

let query_route = '/api/products';
let query_function = (req,res) =>{
    let limit = req.query.limit ?? 12 
    let product = producto.getProducts().slice(0,limit)
    if (product.length>0){
        return res.send({
            success: true,
            product
    })
    } else {
        return res.send({
            success: false,
            product: 'Products not found'
    }) 
    }
}
server.get(query_route,query_function)

let products_route = '/api/products/:pid';
let products_function = (req,res) => {
    let parametros = req.params
    let id = Number(parametros.pid)
    let one = producto.getProductById(id)
    console.log(one)
    if (one){
        return res.send({
            success: true,
            response: one
    })
    } else {
        return res.send({
            success: false,
            response: 'Product id not found'
    })
}
}
server.get(products_route,products_function) 
