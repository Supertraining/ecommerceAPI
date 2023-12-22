import DAOFactory from "../apis/DAOs/DAOFactory.js";
import CartsController from "../apis/controllers/carts.js";
import { productService } from "./product.js";
import CartsRepo from "../apis/repo/carts.js";
import CartsRouter from "../apis/router/carts.js";
import CartsServices from "../apis/services/carts.js";


const cartDAO = new DAOFactory('cart');
const cartRepo = new CartsRepo(cartDAO);
export const cartService = new CartsServices(cartRepo, productService);
const cartController = new CartsController(cartService);
const cartRouter = new CartsRouter(cartController);

export default cartRouter;