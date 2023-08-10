/**
 * Middleware to verify user logged in and is an an admin.
 */

import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import SessionUtil from '@src/util/SessionUtil';
import { ISessionData } from '@src/dtos/user.dto';


// **** Variables **** //

const USER_UNAUTHORIZED_ERR = 'User not authorized to perform this action';
const EXCLUDED_URL = '/api/users/register'


// **** Types **** //

type TSessionData = ISessionData & JwtPayload;


// **** Functions **** //

/**
 * See note at beginning of file.
 */
async function adminMw(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  
  if (req.baseUrl + req.url === EXCLUDED_URL) {
    return next();
  }

  // Get session data
  const sessionData = await SessionUtil.getSessionData<TSessionData>(req);
  // Set session data to locals
  if (
    typeof sessionData === 'object'/* &&
    sessionData?.role === UserRoles.Admin*/
  ) {
    res.locals.sessionUser = sessionData;
    return next();
  // Return an unauth error if user is not an admin
  } else {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: USER_UNAUTHORIZED_ERR });
  }
}


// **** Export Default **** //

export default adminMw;
