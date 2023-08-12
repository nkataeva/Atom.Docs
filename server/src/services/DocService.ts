import Document from '@src/models/Document';
import { IDocData } from '@src/dtos/doc.dto';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import DocSignService from './DocSignService';


// // **** Variables **** //

export const DOC_NOT_FOUND_ERR = 'Документ не найден';

/**
 * Create new document.
 */
async function create(docData: IDocData) {
   const doc = await Document.create(
    {
      typeId: docData.id_type,
      ownerId: docData.id_user,
      name: docData.name,
      creationDate: Date(),
    }
  );

  // дополнительные поля
  if (docData.extra?.dt_start !== undefined) {
    doc.vacationBeginDate = new Date(docData.extra.dt_start);
  }
  if (docData.extra?.duration !== undefined) {
    doc.vacationDuration = docData.extra.duration;
  }
  if (docData.extra?.name_org !== undefined) {
    doc.orgName = docData.extra.name_org;
  }
  if (docData.extra?.content !== undefined) {
    doc.content = docData.extra.content;
  }
  if (docData.extra?.reason !== undefined) {
    doc.reason = docData.extra.reason;
  }
  await doc.save();

  return doc;
}

/**
 * Send document to sign.
 */
async function send(docId: number, signers: number[]) {
  // find user by id
  const doc = await Document.findByPk(docId);
  if (doc === null) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      DOC_NOT_FOUND_ERR,
    );
  }

  for (const signerId of signers) {
    await DocSignService.create(docId, signerId);
  }
}


// /**
//  * Delete a user by their id.
//  */
// async function _delete(usrId: number) {
//   // find user by id
//   const usr = await User.findByPk(usrId);
//   if (usr === null) {
//     throw new RouteError(
//       HttpStatusCodes.NOT_FOUND,
//       USER_NOT_FOUND_ERR,
//     );
//   }

//   await usr.destroy();
// }


// **** Export default **** //

export default {
   create,
   send,
  //  sign,
  //  getCreated,
} as const;
