import DAOFactory from "../DAOs/DAOFactory.js";
import ProductsControllers from "../controllers/products.js";
import ProductRepo from "../repo/products.js";
import ProductsRouter from "../router/products.js";
import ProductServices from "../services/products.js";



const productDAO = new DAOFactory('product');
const productRepo = new ProductRepo(productDAO);
export const productService = new ProductServices(productRepo);
const productController = new ProductsControllers(productService);
const productRouter = new ProductsRouter(productController);

export default productRouter;