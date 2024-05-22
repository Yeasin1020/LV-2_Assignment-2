import express, { Request, Response } from 'express';
import { ProductRoutes } from './modules/product/product.route';
import { OrderRoutes } from './modules/order/order.route';
const app = express();

app.use(express.json());

app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);


app.get("/", (req: Request, res: Response) => {
	res.send("hiiiiiiiii")
})
app.use((req: Request, res: Response) => {
	res.status(404).json({
		success: false,
		message: 'Route not found'
	});
});

app.use((err: any, req: Request, res: Response) => {
	res.status(500).json({
		success: false,
		message: 'Order not found'
	});
});

export default app;
