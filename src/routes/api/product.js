import { Router } from "express";
import producto from "../../managers/Products.js";
import pValidator from "../../middlewares/pvalidator.js";

const router = Router()

router.post("/", pValidator, async (req, res, next) => {
	try {
		let { title, description, price, thumbnail, stock } = req.body;

		title = title ?? null;
		description = description ?? null;
		price = price ?? null;
		thumbnail = thumbnail ?? null;

		const validProps = ["title", "description", "price", "thumbnail", "stock"];
		for (const prop in req.body) {
			if (!validProps.includes(prop)) {
				throw `wrong data sent '${prop}`;
			}
		}

		const product = await product_manager.addProduct({
			title,
			description,
			price,
			thumbnail,
			stock,
		});

		res.json({
			status: 201,
			success: true,
			product,
		});
	} catch (error) {
		next(error);
	}
});
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