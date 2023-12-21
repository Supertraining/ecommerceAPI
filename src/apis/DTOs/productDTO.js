class ProductoDTO {

    constructor({ nombre, precio, foto, descripcion, codigo, categoria, stock }) {

        this.timestamp = Date.now()
        this.nombre = nombre
        this.descripcion = descripcion
        this.codigo = codigo
        this.foto = foto
        this.precio = precio  
        this.stock = stock
        this.categoria = categoria

    }
    
}

export function productoDTO(producto) {

    if (Array.isArray(producto)) {
        
        return producto.map((p) => new ProductoDTO(p))

    }
    
    return  new ProductoDTO(producto)

}