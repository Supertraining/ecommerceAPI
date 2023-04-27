import logger from '../utils/logger.js'

export default class ProductModel {
    #id
    #nombre
    #precio
    #foto
    #timestamp
    #codigo
    #descripcion
    #categoria

    constructor({ nombre, precio, foto, codigo, descripcion, categoria, _id, timestamp }) {

        this.id = _id
        this.nombre = nombre
        this.precio = precio
        this.foto = foto
        this.codigo = codigo
        this.descripcion = descripcion
        this.categoria = categoria
        this.timestamp = timestamp

    }

    get id() {

        return this.#id;

    }

    set id(id) {
        
        if (!id) {

            logger.error('El id es un campo requerido');

        }

        this.#id = id

    }

    get timestamp() {
        
        return this.#timestamp;

    }
    
    set timestamp(timestamp) {
        
        if (!timestamp) {

            logger.error('El timestamp es un campo requerido');

        }

        this.#timestamp = timestamp

    }
    get nombre() {

        return this.#nombre;

    }

    set nombre(nombre) {

        if (!nombre) {

            logger.error('El nombre es un campo requerido');

        }

        this.#nombre = nombre;

    }

    get precio() {

        return this.#precio;

    }

    set precio(precio) {

        if (!precio) {

            logger.error('El precio es un campo requerido');

        }

        if (isNaN(precio)) {

            logger.error('El precio debe ser un numero');

        }

        this.#precio = precio;

    }

    get foto() {

        return this.#foto;

    }

    set foto(foto) {

        if (!foto) {

            logger.error('La foto es un campo requerido');

        }

        this.#foto = foto;

    }

    get timestamp() {

        return this.#timestamp;

    }

    set timestamp(timestamp) {

        if (!timestamp) {

            logger.error('El timestamp es un campo requerido');

        }

        this.#timestamp = timestamp;

    }

    get codigo() {

        return this.#codigo;

    }

    set codigo(codigo) {

        if (!codigo) {

            logger.error('El codigo es un campo requerido');

        }

        if (isNaN(codigo)) {

            logger.error('El codigo debe ser un numero');

        }

        this.#codigo = codigo;

    }

    get descripcion() {

        return this.#descripcion;

    }

    set descripcion(descripcion) {

        if (!descripcion) {

            logger.error('La descripcion es un campo requerido');

        }

        this.#descripcion = descripcion;

    }

    get categoria() {

        return this.#categoria;

    }

    set categoria(categoria) {

        if (!categoria) {

            logger.error('El categoria es un campo requerido');

        }

        this.#categoria = categoria;

    }

    datos() {

        return JSON.parse(JSON.stringify(

            {
                _id: this.#id,
                nombre: this.#nombre,
                precio: this.#precio,
                foto: this.#foto,
                timestamp: this.#timestamp,
                codigo: this.#codigo,
                descripcion: this.#descripcion,
                categoria: this.#categoria
            }

        ))

    }

}