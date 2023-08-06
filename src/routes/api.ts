import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from './constants/Paths';
import UserRoutes from './UserRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = Router();

// Get all users
userRouter.get(
  Paths.Users.Get,
  UserRoutes.getAll,
);

// Register new user
userRouter.post(
  Paths.Users.Register,
  validate('login', 'email', 'password', 'fio'),
  UserRoutes.register,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate('login', 'email', 'password', 'fio', ['id', 'number', 'params']),
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

// Login user 
userRouter.post(
  Paths.Users.Login,
  validate('login', 'password'),
  UserRoutes.login,
)

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);


// **** Export default **** //

export default apiRouter;
