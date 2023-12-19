import DAOFactory from './DAOs/DAOFactory.js';
import UsersRepo from './repo/users.js';
import UsersServices from './services/users.js';
import UsersController from './controllers/users.js';
import UserRouter from './router/users.js';

const DaoFactory = new DAOFactory('user')
const userRepo = new UsersRepo(DaoFactory)
const userService = new UsersServices(userRepo)
const userControllers = new UsersController(userService)
export const userRouter = new UserRouter(userControllers)
