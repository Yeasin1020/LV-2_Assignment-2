import express, { Request, Response } from 'express'
import { ProductControllers } from './product.controller';



const router = express.Router()

router.post('/', ProductControllers.createProduct)
router.get('/', ProductControllers.getAllProducts)
router.delete('/:productId', ProductControllers.deleteProduct)

export const ProductRoutes = router;