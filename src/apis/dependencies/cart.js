import DAOFactory from "../DAOs/DAOFactory.js";
import CartsController from "../controllers/carts.js";
import { productService } from "./product.js";
import CartsRepo from "../repo/carts.js";
import CartsRouter from "../router/carts.js";
import CartsServices from "../services/carts.js";


const cartDAO = new DAOFactory('cart');
const cartRepo = new CartsRepo(cartDAO);
export const cartService = new CartsServices(cartRepo, productService);
const cartController = new CartsController(cartService);
const cartRouter = new CartsRouter(cartController);

export default cartRouter;