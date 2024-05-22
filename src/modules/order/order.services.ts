import { TOrder } from "./order.interface";
import { Order } from "./order.model";


const createOrderFromDB = async (orderData: TOrder) => {
	const result = await Order.create(orderData);
	return result;
}

// const getAllOrderFromDB = async (email?: string) => {

// 	try {
// 		let query = {};
// 		if (email) {
// 			query = { email: { $regex: email, $options: 'i' } };
// 		}
// 		const result = await Order.find();
// 		return result;
// 	} catch (err) {
// 		throw new Error('Error fetching products');
// 	}

// }

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