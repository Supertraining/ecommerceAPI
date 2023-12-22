import DAOFactory from "../apis/DAOs/DAOFactory.js";
import ProductsControllers from "../apis/controllers/products.js";
import ProductRepo from "../apis/repo/products.js";
import ProductsRouter from "../apis/router/products.js";
import ProductServices from "../apis/services/products.js";



const productDAO = new DAOFactory('product');
const productRepo = new ProductRepo(productDAO);
export const productService = new ProductServices(productRepo);
const productController = new ProductsControllers(productService);
const productRouter = new ProductsRouter(productController);

export default productRouter;