import { Model } from "mongoose";

export interface IProductVariant {
	type: string;
	value: string;
}

export interface IInventory {
	quantity: number;
	inStock: boolean;
}

export interface IProduct {
	name: string;
	description: string;
	price: number;
	category: string;
	tags: string[];
	variants: IProductVariant[];
	inventory: IInventory;
	isDeleted: boolean
}

// export interface ProductModel extends Model<IProduct> {
// 	isProductExists(_id: string): Promise<IProduct | null>
// }