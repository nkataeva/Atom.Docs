import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IUserData, ISessionData } from '@src/dtos/user.dto';
import { IReq, IRes } from './types/express/misc';
import SessionUtil from '@src/util/SessionUtil';


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
 * Get session user.
 */
async function getLogonUser(req: IReq, res: IRes) {
  // Get session data
  const sessionData = await SessionUtil.getSessionData<ISessionData>(req);

  return res.status(HttpStatusCodes.OK).json({ sessionData });
}


// **** Export default **** //

export default {
  getAll,
  register,
  update,
  delete: delete_,
  getLogonUser,
} as const;
