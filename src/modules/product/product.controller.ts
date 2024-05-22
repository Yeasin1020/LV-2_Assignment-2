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
		const result = await ProductServices.getAllProductsFromDB(searchTerm as string);

		let message = "Products fetched successfully!";

		if (searchTerm) {
			message = `Products matching search term '${searchTerm}' fetched successfully!`;
		}

		res.status(200).json({
			success: true,
			message,
			data: result
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message || 'Something went wrong',
			error: err,
		});
	}
}
// get single data
const getSingleProduct = async (req: Request, res: Response) => {
	try {
		const { productId } = req.params;
		const result = await ProductServices.getSingleProductFromDB(productId);

		res.status(200).json({
			success: true,
			message: 'Product fetched successfully!',
			date: result,
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message || 'Something went wrong',
			error: err,
		});
	}
};

//update product
const updateProduct = async (req: Request, res: Response) => {
	try {
		const { productId } = req.params;
		const updateData = req.body;

		const result = await ProductServices.updateProductByIdFromDB(
			productId,
			updateData,
		);

		res.status(200).json({
			success: true,
			message: 'Product updated successfully!',
			data: result,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message || 'Something went wrong!',
			data: error,
		});
	}
};

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
	getSingleProduct,
	updateProduct
}