import { Request, Response } from "express";
import { Product } from "./product.model";
import { productValidationSchema } from "./product.validation";
import { ProductServices } from "./product.services";


const createProduct = async (req: Request, res: Response) => {
	try {
		const productData = req.body;

		//data validation using zod
		const zodParseData = productValidationSchema.parse(productData);

		const result = await Product.create(zodParseData);

		res.status(200).json({
			success: true,
			message: 'Product created successfully!',
			data: result
		})
		return result;
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message || 'Something went wrong',
			error: err,
		});
	}
}

// get all product from DB and search product
const getAllProducts = async (req: Request, res: Response) => {
	try {
		const { searchTerm } = req.query;
		const products = await ProductServices.getAllProductsFromDB(searchTerm as string);

		let message = "Products fetched successfully!";
		let data = products;

		if (searchTerm) {
			message = `Products matching search term '${searchTerm}' fetched successfully!`;
		}

		res.status(200).json({
			success: true,
			message,
			data
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message || 'Something went wrong',
			error: err,
		});
	}
}

// delete product from DB
const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { productId } = req.params;
		const result = await ProductServices.deleteProductFromDB(productId)
		res.status(200).json({
			success: true,
			message: "Products fetched successfully!",
			data: result
		})
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message || 'Something went wrong',
			error: err,
		});
	}
}

export const ProductControllers = {
	createProduct,
	getAllProducts,
	deleteProduct,
	// updateProduct
}