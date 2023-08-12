import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import DocService from '@src/services/DocService';
import { IDocData } from '@src/dtos/doc.dto';
import { IReq, IRes } from './types/express/misc';

// **** Functions **** //

/**
 * Create new document.
 */
async function create(req: IReq<IDocData>, res: IRes) {
  const docData = req.body;
  const newDoc = await DocService.create(docData);
  return res.status(HttpStatusCodes.CREATED).json({"id" : newDoc.id}).end();
}

/**
 * Send document to sign.
 */
async function send(req: IReq<number[]>, res: IRes) {
  const signers = req.body;
  const id = +req.params.id;
  await DocService.send(id, signers);
  return res.status(HttpStatusCodes.OK).end();
}

// /**
//  * Sign document.
//  */
// async function sign(req: IReq<IDocSign>, res: IRes) {
// //  const usrData = req.body;
// //  const id = +req.params.id;
// //  await DocService.update(id, usrData);
// //  return res.status(HttpStatusCodes.OK).end();
// }

// /**
//  * Get docs created by user.
//  */
// async function getCreated(req: IReq, res: IRes) {
// //  const users = await UserService.getAll();
// //  return res.status(HttpStatusCodes.OK).json({ users });
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
   create,
   send,
//   sign,
//   getCreated,
} as const;
