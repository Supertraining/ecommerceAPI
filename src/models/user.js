import logger from '../utils/logger.js'

export default class UserModel {
    #username
    #password
    #nombre
    #edad
    #direccion
    #telefono
    #cartId
    #admin

    constructor({ username, password, nombre, edad, direccion, telefono, cartId, admin }) {

        this.username = username
        this.password = password
        this.nombre = nombre
        this.edad = edad
        this.direccion = direccion
        this.telefono = telefono
        this.cartId = cartId
        this.admin = admin
        
    }

    get username() {

        return this.#username;

    }

    set username(username) {

        if (!username) {

            logger.error('El username es un campo requerido');

        }

        this.#username = username;
    }

    get password() {

        return this.#password;

    }

    set password(password) {

        if (!password) {

            logger.error('El password es un campo requerido');

        }

        this.#password = password;

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

    get edad() {

        return this.#edad;

    }

    set edad(edad) {

        if (!edad) {

            logger.error('La edad es un campo requerido');

        }

        if (isNaN(edad)) {

            logger.error('La edad debe ser un numero');

        }

        this.#edad = edad;
    }

    get direccion() {

        return this.#direccion;

    }

    set direccion(direccion) {

        if (!direccion) {

            logger.error('La direccion es un campo requerido');

        }

        this.#direccion = direccion;
    }

    get telefono() {

        return this.#telefono;
    }

    set telefono(telefono) {

        if (!telefono) {
            
            logger.error('El telefono es un campo requerido');

        }

        this.#telefono = telefono

    }
    get cartId() {

        return this.#cartId;

    }

    set cartId(cartId) {

        if (!cartId) {

            logger.error('El cartId es un campo requerido');

        }

        this.#cartId = cartId;
    }

    get admin() {
        
        return this.#admin;

    }

    set admin(admin) {
        
        if (!admin) {
         
            logger.error('El admin es un campo requerido');

        }

        this.#admin = admin

    }

    datos() {

        return JSON.parse(JSON.stringify(
        
            {
                username: this.#username,
                password: this.#password,
                nombre: this.#nombre,
                edad: this.#edad,
                direccion: this.#direccion,
                telefono: this.#telefono,
                cartId: this.#cartId,
                admin: this.#admin
            }

        ))

    }

}