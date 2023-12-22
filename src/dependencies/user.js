import DAOFactory from '../apis/DAOs/DAOFactory.js';
import UsersRepo from '../apis/repo/users.js';
import UsersServices from '../apis/services/users.js';
import UsersController from '../apis/controllers/users.js';
import UserRouter from '../apis/router/users.js';
import { cartService } from './cart.js';

const userDAO = new DAOFactory('user');
const userRepo = new UsersRepo(userDAO);
export const userService = new UsersServices(userRepo);
const userControllers = new UsersController(userService, cartService);
const userRouter = new UserRouter(userControllers);

export default userRouter;