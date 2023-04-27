import logger from "../utils/logger.js";

export default class CartModel {
    #id
    #timestamp
    #productos

    constructor({ _id, timestamp, productos }) {

        this.id = _id
        this.timestamp = timestamp
        this.productos = productos
        
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

    get productos() {

        return this.#productos;

    }

    set productos(productos) {

        if (!productos) {

            logger.error('Productos es un campo requerido');

        }

        this.#productos = productos

    }

    datos() {

        return JSON.parse(JSON.stringify(
            {
                _id: this.#id,
                timestamp: this.#timestamp,
                productos: this.#productos
            }
        ));

    }

}