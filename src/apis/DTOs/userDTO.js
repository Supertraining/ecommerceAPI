
class UserDTO {
    constructor({ username, password, nombre, direccion, edad, telefono, imagen, cartId, admin }) {

        this.username = username
        this.password = password
        this.nombre = nombre
        this.direccion = direccion
        this.edad = edad
        this.telefono = telefono
        this.imagen = imagen
        this.cartId = cartId
        this.admin = admin
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
