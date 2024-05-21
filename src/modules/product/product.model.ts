import { Schema, model } from "mongoose";
import { IInventory, IProduct, IProductVariant } from "./product.interface";

const productVariantSchema = new Schema<IProductVariant>({
	type: { type: String, required: true },
	value: { type: String, required: true }
});

// Define the schema for Inventory
const inventorySchema = new Schema<IInventory>({
	quantity: { type: Number, required: true },
	inStock: { type: Boolean, required: true }
});

// Define the schema for Product
const productSchema = new Schema<IProduct>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	tags: { type: [String], required: true },
	variants: { type: [productVariantSchema], required: true },
	inventory: { type: inventorySchema, required: true },
	isDeleted: {
		type: Boolean,
		default: false
	}
});

// creating a custom static method
// productSchema.statics.isProductExists = async function (_id: string) {
// 	const existingProduct = await Product.findOne({ _id });
// 	return existingProduct
// }

// Create and export the Product model
export const Product = model<IProduct>('Product', productSchema);