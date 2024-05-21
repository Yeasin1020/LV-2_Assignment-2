import { z } from 'zod';

export const orderValidationSchema = z.object({
	email: z.string().email(),
	productId: z.string().min(1), // Assuming productId is a string; adjust validation if it's an ObjectId
	price: z.number().positive(),
	quantity: z.number().int().positive(),
});

