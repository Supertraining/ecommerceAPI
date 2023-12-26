export default class CartsController {

	constructor(service) {

		this.cartServices =  service

	}

	createCart = async (req, res, next) => {

		try {

			const data = await this.cartServices
				.createCart();

			res.status(201).json(data);

		} catch (error) {

			next(error)

		}

	};

	addProduct = async (req, res, next) => {

		try {

			const productId = req.params.idProducto

			const cartId = req.params.idCarrito

			const cartWithProduct = await this.cartServices
				.addProduct(cartId, productId );
			
				res.json(cartWithProduct).send()
		

		} catch (error) {

			next(error)

		}

	};

	getAll = async (req, res, next) => {

		try {

			let carts = await this.cartServices
				.getAll();

			carts.length === 0
			? res.json(carts).send('No hay carritos creados')
			: res.json(carts)

		} catch (error) {

			next(error)

		}

	}

	getCartById = async (req, res, next) => {

		try {

			let cart = await this.cartServices
				.getCartById(req.params.id);

				res.json(cart)

		} catch (error) {

			next(error)

		}

	}

	getCartProducts = async (req, res, next) => {

		try {

			const cartProducts = await this.cartServices
				.getCartProducts(req.params.id);

			res.json(cartProducts)

		} catch (error) {

			next(error)

		}

	};

	deleteCartById = async (req, res, next) => {
		
		try {

			const data = await this.cartServices
				.deleteCartById(req.params.id);

			res.json(data);

		} catch (error) {

			next(error)

		}

	};

	deleteCartProductById = async (req, res, next) => {

		try {

			const cartId = req.params.idCarrito;
			const productId = req.params.id_prod

			const updatedCart = await this.cartServices
				.deleteCartProductById(cartId, productId);

			res.json(updatedCart).send(`El producto ${productId} se ha eliminado correctamente del carrito ${cartId}`)

		} catch (error) {

			next(error)

		}

	};

}


