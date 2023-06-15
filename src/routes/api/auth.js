import { Router } from "express"
import uploader from '../../middlewares/multer.js'
import producto from "../../managers/products.js"

const router = Router()

router.post('/signup',uploader.single('file'), async(req,res,next)=> {
    const { title, description, price, thumbnail, stock } = req.body
    try {
        if (!req.file) {
            return res.send('no se pudo cargar la imagen')
        } 
        let new_product = { title, description, price, thumbnail, stock }   //construyo el usuario
        new_product.url_photo = req.file.path      //agrego la ruta de la foto
        await producto.add_product(new_product)        //creo un usuario
        return res.json({                   //envio la respuesta
            status: 201,
            message: 'user created'
        })
    } catch(error) {
        next(error)
    }
})

export default router