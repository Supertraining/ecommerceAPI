import mongoose from 'mongoose';

const cartsCollection = 'carts';
const cartsSchema = new mongoose.Schema({
	timestamp: { type: Date },
	productos: [
		{
			
		},
	],
});

const CartSchema = mongoose.model(cartsCollection, cartsSchema);

export default CartSchema;
