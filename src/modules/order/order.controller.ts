import { Request, Response } from "express";
import { Product } from "../product/product.model";
import { OrderServices } from "./order.services";
import { orderValidationSchema } from "./order.validation";

const orderCreate = async (req: Request, res: Response) => {
	try {
		const { productId } = req.body;
		const orderData = req.body;
		const zodParseData = orderValidationSchema.parse(orderData);
		// Check if the product exists
		const productExists = await Product.exists({ _id: productId });
		const result = await OrderServices.createOrderFromDB(zodParseData);
		res.status(200).json({
			success: true,
			message: 'Product created successfully!',
			data: result
		})
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message || 'Something went wrong!',
			error: error,
		});
	}
};

// get all data from db
// const getAllOrder = async (req: Request, res: Response) => {
// 	try {

// 		const { email } = req.query
// 		const result = await OrderServices.getAllOrderFromDB(email as string);

// 		let message = "Orders fetched successfully!";

// 		if (email) {
// 			message = "Orders fetched successfully for user email!";
// 		}

// 		res.status(200).json({
// 			success: true,
// 			message,
// 			data: result
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

const getAllOrder = async (req: Request, res: Response) => {
	try {
		const { email } = req.query;
		console.log(email);
		const result = await OrderServices.getAllOrderFromDB(email as string);

		console.log(result);
		let message = "Orders fetched successfully!";

		if (email) {
			message = "Orders fetched successfully for user email!";
		}

		res.status(200).json({
			success: true,
			message,
			data: result
		});
	} catch (err: any) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: err.message || 'Something went wrong!',
			error: err,
		});
	}
};

export const OrderController = {
	orderCreate,
	getAllOrder
} 