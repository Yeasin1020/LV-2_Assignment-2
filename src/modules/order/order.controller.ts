import { Request, Response } from "express";
import { Product } from "../product/product.model";
import { OrderServices } from "./order.services";
import { orderValidationSchema } from "./order.validation";

const orderCreate = async (req: Request, res: Response) => {
	try {
		const { productId } = req.body;
		console.log(productId);
		const orderData = req.body;
		console.log("This is order data:", orderData);
		const zodParseData = orderValidationSchema.parse(orderData);
		console.log('Parsed data:', zodParseData); // Log the parsed data
		// Check if the product exists
		const productExists = await Product.exists({ _id: productId });
		const result = await OrderServices.createOrderFromDB(orderData);
		res.status(200).json({
			success: true,
			message: 'Product created successfully!',
			data: result
		})
		// Create the order
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message || 'Something went wrong!',
			error: error,
		});
	}
};



export const OrderController = {
	orderCreate,

} 