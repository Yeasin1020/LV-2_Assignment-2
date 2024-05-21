import { z } from 'zod';

// Define the Zod schema for ProductVariant
export const productVariantValidationSchema = z.object({
	type: z.string().min(1, { message: "Type is required" }),
	value: z.string().min(1, { message: "Value is required" }),
});

// Define the Zod schema for Inventory
export const inventoryValidationSchema = z.object({
	quantity: z.number().min(0, { message: "Quantity must be at least 0" }),
	inStock: z.boolean(),
});

// Define the Zod schema for Product
export const productValidationSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	description: z.string().min(1, { message: "Description is required" }),
	price: z.number().min(0, { message: "Price must be at least 0" }),
	category: z.string().min(1, { message: "Category is required" }),
	tags: z.array(z.string().min(1, { message: "Tag cannot be empty" })).nonempty({ message: "At least one tag is required" }),
	variants: z.array(productVariantValidationSchema).nonempty({ message: "At least one variant is required" }),
	inventory: inventoryValidationSchema,
	isDelete: z.boolean().optional()
});
