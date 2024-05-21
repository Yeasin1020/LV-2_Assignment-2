import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (productData: IProduct) => {
	const result = await Product.create(productData);
	return result;
}

const getAllProductsFromDB = async () => {
	const result = await Product.find();
	return result;
}

const deleteProductFromDB = async (id: string) => {
	const result = await Product.updateOne({ _id: id }, { isDeleted: true });
	return result;
}

export const ProductServices = {
	createProduct,
	getAllProductsFromDB,
	deleteProductFromDB,

}