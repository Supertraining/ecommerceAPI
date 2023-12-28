
class UserDTO {
    constructor({ username, password, nombre, direccion, edad, telefono, imagen, cartId, role }) {

        this.username = username
        this.password = password
        this.nombre = nombre
        this.direccion = direccion
        this.edad = edad
        this.telefono = telefono
        this.imagen = imagen
        this.cartId = cartId
        this.role = role
    }

    toPlainObject() {
        return {
            username: this.username,
            password: this.password,
            nombre: this.nombre,
            direccion: this.direccion,
            edad: this.edad,
            telefono: this.telefono,
            imagen: this.imagen,
            cartId: this.cartId,
            role: this.role
        };
    }
}


export default function userDTO(user) {
    try {

        if (Array.isArray(user)) {


            return new UserDTO(user)

        }
        return new UserDTO(user)
    } catch (error) {
        throw error
    }

}
