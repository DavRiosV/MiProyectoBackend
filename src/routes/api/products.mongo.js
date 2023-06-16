import { Router } from "express";
import Product from "../../models/products.models.js"
import producto from "../../managers/products.js";

const router = Router()

router.post('/', async (req,res)=> {
    try{
        let title = req.body.title ?? null
        let description = req.body.description ?? null
        let price = req.body.price ?? null
        let thumbnail = req.body.thumbnail ?? null
        let stock = req.body.stock ?? []
        if (title&&description&&price&&thumbnail){
            let product = await Product.create({title, description, price, thumbnail, stock})
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
        let products = await Product.find()
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
        let id = req.params.pid
        let product = await Product.findById(id)
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
        let id = req.params.pid
        let data = req.body
        if (req.body&&req.params.pid) {
            await Product.findByIdAndUpdate(id,data, {new:true})
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
        let id = req.params.pid
        let response1 = await Product.findByIdAndDelete(id)
        if (response1) {
            
            return res.json({ status:200,
                            message:'product deleted',
                        response1})
        } 
        let message = 'not found'
            return res.json({ status:404,message})
        } catch(error) {
            next(error)
        }
}
)

export default router