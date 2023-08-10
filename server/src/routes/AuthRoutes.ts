import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import SessionUtil from '@src/util/SessionUtil';
import AuthService from '@src/services/AuthService';

import { IReq, IRes } from './types/express/misc';
import { ILoginData } from '@src/dtos/user.dto';


// **** Functions **** //

/**
 * Login a user.
 */
async function login(req: IReq<ILoginData>, res: IRes) {
  const loginData = req.body;
  // Login
  const user = await AuthService.login(loginData);
  // Setup Admin Cookie
  await SessionUtil.addSessionData(res, {
    id: user.id,
    login: user.login,
    email: user.email
  });
  // Return
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  SessionUtil.clearCookie(res);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  login,
  logout,
} as const;
