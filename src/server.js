import server from "./app.js"
import { Server } from "socket.io"
import { connect } from "mongoose"

const port = process.env.PORT || 8080
const ready = () => {
    console.log('Server ready on port ' + port)
    connect(process.env.LINK_MONGO)
        .then(() => console.log('connected to database'))
        .catch(err=>console.log(err))
}

server.listen(port,ready)

// const chats = [];

// const http_server = server.listen(port,ready);
// const socket_server = new Server(http_server);

// socket_server.on("connection", (socket) => {

// 	socket.on("auth", () => {
// 		socket_server.emit("all_messages", chats);
// 	});

// 	socket.on("new_message", (data) => {
// 		chats.push(data);
//         console.log(chats)
// 		socket_server.emit("all_messages", chats);
// 	});
// 	console.log(socket.client.id);
// });

// let index_route = '/'
// let index_function = (req,res) => {
//     let allProducts = producto.getProducts().length
//     console.log(allProducts)
//     return res.send(`There're ${allProducts} products`)
// }
// server.get(index_route,index_function) 

// let query_route = '/api/products';
// let query_function = (req,res) =>{
//     let limit = req.query.limit ?? 12 
//     let product = producto.getProducts().slice(0,limit)
//     if (product.length>0){
//         return res.send({
//             success: true,
//             product
//     })
//     } else {
//         return res.send({
//             success: false,
//             product: 'Products not found'
//     }) 
//     }
// }
// server.get(query_route,query_function)

// let products_route = '/api/products/:pid';
// let products_function = (req,res) => {
//     let parametros = req.params
//     let id = Number(parametros.pid)
//     let one = producto.getProductById(id)
//     console.log(one)
//     if (one){
//         return res.send({
//             success: true,
//             response: one
//     })
//     } else {
//         return res.send({
//             success: false,
//             response: 'Product id not found'
//     })
// }
// }
// server.get(products_route,products_function) 
// // sector del carrito
// let cart_route = '/api/carts';
// let cart_function = (req,res) =>{
//     let limit = req.query.limit ?? 12 
//     let carts = manager.getCarts().slice(0,limit)
//     if (carts.length>0){
//         return res.send({
//             success: true,
//             carts
//     })
//     } else {
//         return res.send({
//             success: false,
//             carts: 'Products carts not found'
//     }) 
//     }
// }
// server.get(cart_route,cart_function)

// let cid_route = '/api/carts/:cid';
// let cid_function = (req,res) => {
//     let parametros = req.params
//     let id = Number(parametros.cid)
//     let one = manager.getCartById(id)
//     console.log(one)
//     if (one){
//         return res.send({
//             success: true,
//             response: one
//     })
//     } else {
//         return res.send({
//             success: false,
//             response: 'Cart id not found'
//     })
// }
// }
// server.get(cid_route,cid_function)


    // server.put(
    //     '/api/products/:uid',
    // (req,res)=>{
    //     if (req.body&&req.params.uid) {
    //     let id = Number(req.params.uid)
    //     let data = req.body
    //     producto.updateProduct(id,data)
    //     return res.json({
    //         status: 200,
    //         message: 'product update'
    //     })
    //     } else {
    //         return res.json({
    //             status: 400,
    //             message: 'check data'
    //         })
    //     }
    //     }
    // )
