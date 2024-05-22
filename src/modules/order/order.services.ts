import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";



const createOrderFromDB = async (orderData: TOrder) => {
	try {
		const { productId, quantity } = orderData;


		// Fetch the product details
		const product = await Product.findById(productId);
		if (!product || !product.inventory) {
			throw new Error('Product not found');
		}

		if (product.inventory.quantity < quantity) {
			throw new Error('Insufficient quantity available in inventory');
		}

		// Determine the new value for inStock
		const newInStockValue = product.inventory.quantity - quantity > 0;

		// Update the product inventory using atomic operators
		await Product.updateOne(
			{ _id: productId },
			{
				$inc: { 'inventory.quantity': -quantity },
				$set: { 'inventory.inStock': newInStockValue },
			},
		);

		// Embed the product details in the order
		const orderWithProductDetails = {
			...orderData,
			productDetails: {
				name: product.name,
				description: product.description,
				price: product.price,
				category: product.category,
				tags: product.tags,
				variants: product.variants,
			},
		};

		// Create the order
		const order = new Order(orderWithProductDetails);
		const result = await order.save();

		return result;
	} catch (error) {
		throw error;
	}
};


const getAllOrderFromDB = async (email?: string) => {
	try {
		let query = {};
		if (email) {
			query = { email: { $regex: email, $options: 'i' } };
		}
		console.log(query);
		const result = await Order.find(query);
		return result;
	} catch (err) {
		throw new Error('Error fetching orders');
	}
};

export const OrderServices = {
	createOrderFromDB,
	getAllOrderFromDB
}