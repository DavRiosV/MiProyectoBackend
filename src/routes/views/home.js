import { Router } from "express"
import auth_router from "./auth.js"
import products_router from "./products.js"
import cart_router from "./cart.js"

const router = Router()

router.get(
    '/', 
    async(req,res,next)=> {
    try {
        return res.render(
            'index',
            {
            //     products: [  
                    
            //     {   
            //         title: "Peluche Pikachu",
            //         description: "Peluche de 30 cm de alto",
            //         price: 15000,
            //         thumbnail: "https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/pikachu.jpg?alt=media&token=c0be09a8-e126-4943-9b6f-f68c52fd5d8c",
            //         stock: 100,
            //         id: 1
            //     },
            //     {
            //         title: "Pikachu dormido",
            //         description: "Peluche de 30 cm de alto",
            //         price: 20000,
            //         thumbnail: "https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/pikachu-durmiendo.jpeg?alt=media&token=0ccc3ea1-8a1f-4d2e-a92b-5457d1cfbe1f",
            //         stock: 100,
            //         id: 2
            //     },
            //     {
            //         title: "Pareja kimono",
            //         description: "Peluche de 30 cm de alto",
            //         price: 20000,
            //         thumbnail: "https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/couple.jpg?alt=media&token=1297e212-66c3-4e15-9000-6a6b3e87072f",
            //         stock: 100,
            //         id: 3
            //     },
            //     {
            //         title: "Peluche Charmander",
            //         description: "Peluche de 30 cm de alto",
            //         price: 15000,
            //         thumbnail: "https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/charmander.jpg?alt=media&token=75ae47b4-9cad-4c4f-b741-db7807aaed28",
            //         stock: 100,
            //         id: 4
            //     },
            //     {
            //         title: "Peluche Charmeleon",
            //         description: "Peluche de 30 cm de alto",
            //         price: 15000,
            //         thumbnail: "https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/charmeleon.jpg?alt=media&token=ee73dc95-dfa9-4152-926d-559461a32174",
            //         stock: 100,
            //         id: 5
            //     },
            //     {
            //         title: "Peluche Charizard",
            //         description: "Peluche de 30 cm de alto",
            //         price: 15000,
            //         thumbnail: "https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/charizard.jpg?alt=media&token=8528930b-d36f-48ae-9d05-486b2e540b3b",
            //         stock: 100,
            //         id: 6
            //     },
            //     {
            //         title: "Holiday Bulbasaur",
            //         description: "Peluche de 30 cm de alto",
            //         price: 15000,
            //         thumbnail: "https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/holiday-bulbasaur.jpg?alt=media&token=96bd993f-ab43-4ea6-a2ca-4fbcecf3a4c9",
            //         stock: 100,
            //         id: 7
            //     },
            //     {
            //         title: "Peluche Ivysaur",
            //         description: "Peluche de 50 cm de alto",
            //         price: 35000,
            //         thumbnail: "https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/ivysaur.jpg?alt=media&token=07f55965-deb8-42f9-9699-f7a52eca3b68",
            //         stock: 100,
            //         id: 8
            //     },
            //     {
            //         title: "Peluche Venasaur XL",
            //         description: "Peluche de 30 cm de alto",
            //         price: 15000,
            //         thumbnail: "https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/venasaur.jpeg?alt=media&token=90b78914-2919-4e3a-aee0-5f3fa828fe17",
            //         stock: 100,
            //         id: 9
            //     },
            //     {
            //         title: "Peluche Squirtle",
            //         description: "Peluche de 30 cm de alto",
            //         price: 20000,
            //         thumbnail: "https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/squirtle.jpeg?alt=media&token=aacbc186-038a-45cb-839e-6aee83f781dc",
            //         stock: 100,
            //         id: 16
            //     },
            //     {
            //         title: "Peluche Wartortle",
            //         description: "Peluche de 30 cm de alto",
            //         price: 15000,
            //         thumbnail: "https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/wartortle.jpeg?alt=media&token=5af9c7f9-10aa-4b5c-8011-e6670630285b",
            //         stock: 100,
            //         id: 11
            //     },
            //     {
            //         title: "Peluche Blastoise",
            //         description: "Peluche de 30 cm de alto",
            //         price: 15000,
            //         thumbnail: "https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/blastoise.jpg?alt=media&token=6feead39-6c8d-4d3e-94fd-5291fb5bc0a1",
            //         stock: 100,
            //         id: 12
            //     },
            // ],
            title: 'Home',
            script: './public/connection.js'
        }
            )
    } catch(error) {
        next(error)
    }
})

router.use('/auth',auth_router)
router.use('/products',products_router)
router.use('/cart',cart_router)
export default router