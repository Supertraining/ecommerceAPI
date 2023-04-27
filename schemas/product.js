import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema(
        {
                timestamp: { type: Date, required: true },
                nombre: { type: String, required: true, max: 100 },
                descripcion: { type: String, required: true, max: 140 },
                codigo: { type: Number, required: true, max: 9999 },
                foto: { type: String, required: true },
                precio: { type: Number, required: true, max: 5000 },
                stock: { type: Number, required: true, max: 7000 },
                categoria: { type: String, required: true },
        }
)

const Productmodel = mongoose.model('products', productsSchema)

export default Productmodel;