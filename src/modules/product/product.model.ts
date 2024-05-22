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

});

//Query middleware

productSchema.pre('find', function (next) {
	this.find({ isDeleted: { $ne: true } })
	next();
});

productSchema.pre('findOne', function (next) {
	this.find({ isDeleted: { $ne: true } })
	next();
})

productSchema.pre('aggregate', function (next) {
	this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
	next();
})

// Create and export the Product model
export const Product = model<IProduct>('Product', productSchema);