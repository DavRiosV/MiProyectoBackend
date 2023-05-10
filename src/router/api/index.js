import { Router } from "express";
import products_router from './product.js'
import cart_router from './cart.js'

const router = Router()

router.use('/products',products_router)
router.use('/carts',cart_router)

export default router