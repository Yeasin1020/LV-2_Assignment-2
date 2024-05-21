import express from 'express'
import { OrderController } from './order.controller';



const router = express.Router()

router.post('/', OrderController.orderCreate)
router.get('/', OrderController.getAllOrder)


export const OrderRoutes = router;