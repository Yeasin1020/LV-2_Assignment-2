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

// delete product
const deleteProductFromDB = async (id: string) => {
	const result = await Product.updateOne({ _id: id }, { isDeleted: true });
	return result;
}


export const ProductServices = {
	createProduct,
	getAllProductsFromDB,
	deleteProductFromDB,


}