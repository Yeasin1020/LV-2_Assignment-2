import express, { Request, Response } from 'express'
import { ProductControllers } from './product.controller';



const router = express.Router()

router.post('/', ProductControllers.createProduct)
router.get('/', ProductControllers.getAllProducts)
router.delete('/:productId', ProductControllers.deleteProduct)
// router.put('/:productId', ProductControllers.updateProduct)


export const ProductRoutes = router;