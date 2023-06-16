import { Router } from "express";
import producto from "../../managers/products.js";
import Product from "../../models/products.models.js";

const router = Router()
//FS
router.post('/', async (req,res)=> {
    try{
        let title = req.body.title ?? null
        let description = req.body.description ?? null
        let price = req.body.price ?? null
        let thumbnail = req.body.thumbnail ?? null
        let stock = req.body.stock ?? []
        if (title&&description&&price&&thumbnail){
            let product = await producto.add_product({title, description, price, thumbnail, stock})
            return res.json({
                status: 201,
                product_id: product.id,
                message: 'created'
            })
        } else {
            return res.json({
                status: 400,
                message: 'check all params'
            })
        }
    } catch (error){
        console.log(error)
        return res.json({
            status: 500,
            message: 'error'
        })
    } 
}
)
router.get('/', async(req,res,next)=> {
    try {
        let products = producto.getProducts()
        if (products.length>0) {
            return res.json({ status:200,products })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})
router.get('/:pid', async(req,res,next)=> {
    try {
        let id = Number(req.params.pid)
        let product = producto.getProductById(id)
        if (product) {
            return res.json({ status:200,product })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})
router.put('/:pid', async(req,res,next)=>{
    try {
        let id = Number(req.params.pid)
        let data = req.body
        if (req.body&&req.params.pid) {
            producto.updateProduct(id,data)
            return res.json({
                status: 200,
                message: 'product update'
            })
        } 
        let message = 'not found'
            return res.json({status: 400, message})
        } catch(error) {
            next(error)
        }
    }) 

router.delete('/:pid', async(req,res,next)=> {
    try {
        let id = Number(req.params.pid)
        let data = req.body
        if (req.body&&req.params.pid) {
            producto.deleteProduct(id,data)
            return res.json({ status:200,message:'product deleted'})
        } 
        let message = 'not found'
            return res.json({ status:404,message})
        } catch(error) {
            next(error)
        }
}
)

export default router