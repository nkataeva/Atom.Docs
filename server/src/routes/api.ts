import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from './constants/Paths';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import adminMw from './middleware/adminMw';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// **** Setup AuthRouter **** //

const authRouter = Router();

// Login user
authRouter.post(
  Paths.Auth.Login,
  validate('login', 'password'),
  AuthRoutes.login,
);

// Logout user
authRouter.get(
  Paths.Auth.Logout,
  AuthRoutes.logout,
);

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);


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

// Get logon user
userRouter.get(
  Paths.Users.GetLogonUser,
  UserRoutes.getLogonUser
);


// Add UserRouter
apiRouter.use(Paths.Users.Base, adminMw, userRouter);


// **** Export default **** //

export default apiRouter;
