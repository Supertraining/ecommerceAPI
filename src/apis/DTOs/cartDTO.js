class CartDTO {
    constructor(_id, timestamp, productos) {

        this._id = _id;
        this.timestamp = timestamp;
        this.productos = productos;


    }

}

export function cartDTO(cart) {

    try {
        if (!cart.timestamp) {

            return new CartDTO(cart._id, Date.now(), []);

        }

        return new CartDTO(cart._id, cart.timestamp, cart.productos);

    } catch (error) {

        throw error;

    }

}



