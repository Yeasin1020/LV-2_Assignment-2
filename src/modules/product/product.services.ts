import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (productData: IProduct) => {
	const result = await Product.create(productData);
	return result;
}

//get all product and search product 
const getAllProductsFromDB = async (searchTerm?: string) => {
	try {
		let query = {};
		if (searchTerm) {
			query = { name: { $regex: searchTerm, $options: 'i' } };
		}
		const result = await Product.find(query);
		return result;
	} catch (error) {
		throw new Error('Error fetching products');
	}
}
// get single product
const getSingleProductFromDB = async (id: string) => {
	const result = await Product.findOne({ _id: id });
	return result;
};

//update product 
const updateProductByIdFromDB = async (
	productId: string,
	updateData: IProduct,
) => {
	const options = { new: true };

	const result = await Product.findByIdAndUpdate(
		productId,
		updateData,
		options,
	);
	return result;
};

// delete product
const deleteProductFromDB = async (id: string) => {
	const result = await Product.updateOne({ _id: id }, { isDeleted: true });
	return result;
}


export const ProductServices = {
	createProduct,
	getAllProductsFromDB,
	deleteProductFromDB,
	getSingleProductFromDB,
	updateProductByIdFromDB

}