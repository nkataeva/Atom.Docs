import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import DocService from '@src/services/DocService';
import { IDocData, IDocSignData } from '@src/dtos/doc.dto';
import { IReq, IRes } from './types/express/misc';

// **** Functions **** //

/**
 * Create new document.
 */
async function create(req: IReq<IDocData>, res: IRes) {
  const docData = req.body;
  const newDoc = await DocService.create(docData);

  if (docData.signers !== undefined) {
    await DocService.send(newDoc.id, docData.signers);
  }

  return res.status(HttpStatusCodes.CREATED).json({ "id": newDoc.id }).end();
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

/**
 * Get docs created by user.
 */
async function getCreated(req: IReq, res: IRes) {
  const idUser = +req.params.id_user;
  const docs = await DocService.getCreated(idUser);
  return res.status(HttpStatusCodes.OK).json({ docs });
}

/**
 * Get docs for sign.
 */
async function getForSign(req: IReq, res: IRes) {
  const idUser = +req.params.id_user;
  const docs = await DocService.getForSign(idUser);

  return res.status(HttpStatusCodes.OK).json({ docs });
}

/**
 * Sign document.
 */
async function sign(req: IReq<IDocSignData>, res: IRes) {
  const signData = req.body;
  const idDoc = +req.params.id_doc;
  await DocService.sign(idDoc, signData);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Decline document.
 */
async function decline(req: IReq<IDocSignData>, res: IRes) {
  const declineData = req.body;
  const idDoc = +req.params.id_doc;
  await DocService.decline(idDoc, declineData);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Get document data
 */
async function getById(req: IReq, res: IRes) {
  const idDoc = +req.params.id_doc;
  const doc = await DocService.getById(idDoc);

  return res.status(HttpStatusCodes.OK).json(doc);
}


// // **** Export default **** //

export default {
  create,
  send,
  getCreated,
  getForSign,
  sign,
  decline,
  getById,
} as const;
