import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import DocService from '@src/services/DocService';
import { IDocData } from '@src/dtos/doc.dto';
import { IReq, IRes } from './types/express/misc';


/**
 * Create new document.
 */
async function create(req: IReq<IDocData>, res: IRes) {
  const docData = req.body;
  await DocService.create(docData);
  return res.status(HttpStatusCodes.CREATED).end();
}


// // **** Functions **** //

// /**
//  * Get all users.
//  */
// async function getAll(_: IReq, res: IRes) {
//   const users = await UserService.getAll();
//   return res.status(HttpStatusCodes.OK).json({ users });
// }

// /**
//  * Update one user.
//  */
// async function update(req: IReq<IUserData>, res: IRes) {
//   const usrData = req.body;
//   const id = +req.params.id;
//   await UserService.update(id, usrData);
//   return res.status(HttpStatusCodes.OK).end();
// }

// /**
//  * Delete one user.
//  */
// async function delete_(req: IReq, res: IRes) {
//   const id = +req.params.id;
//   await UserService.delete(id);
//   return res.status(HttpStatusCodes.OK).end();
// }

// /**
//  * Get session user.
//  */
// async function getLogonUser(req: IReq, res: IRes) {
//   // Get session data
//   const sessionData = await SessionUtil.getSessionData<ISessionData>(req);

//   return res.status(HttpStatusCodes.OK).json({ sessionData });
// }


// // **** Export default **** //

export default {
//   getAll,
   create,
//   update,
//   delete: delete_,
//   getLogonUser,
} as const;
