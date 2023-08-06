import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { ILoginData, IUserData } from '@src/dtos/user.dto';
import { IReq, IRes } from './types/express/misc';
import AuthService from '@src/services/AuthService';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Register user.
 */
async function register(req: IReq<IUserData>, res: IRes) {
  const usrData = req.body;
  await UserService.register(usrData);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<IUserData>, res: IRes) {
  const usrData = req.body;
  const id = +req.params.id;
  await UserService.update(id, usrData);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await UserService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Login user
 */
async function login(req: IReq<ILoginData>, res: IRes) {
  const loginData = req.body;
  await AuthService.login(loginData);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  register,
  update,
  delete: delete_,
  login,
} as const;
