import mongoose from 'mongoose'

const usersCollection = 'users';
const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		nombre: { type: String, required: true },
		direccion: { type: String, required: true },
		edad: { type: Number, reqrequireduire: true },
		telefono: { type: String, required: true },
		imagen: { type: String, required: true },
		cartId: { type: String, required: true, unique: true },
		role: { type: String, required: true },
	}
);

const userModel = mongoose.model(usersCollection, userSchema);

export default userModel;
