import DAOFactory from '../DAOs/DAOFactory.js';
import UsersRepo from '../repo/users.js';
import UsersServices from '../services/users.js';
import UsersController from '../controllers/users.js';
import UserRouter from '../router/users.js';
import { cartService } from './cart.js';

const userDAO = new DAOFactory('user');
const userRepo = new UsersRepo(userDAO);
export const userService = new UsersServices(userRepo, cartService);
const userControllers = new UsersController(userService, cartService);
const userRouter = new UserRouter(userControllers);

export default userRouter;