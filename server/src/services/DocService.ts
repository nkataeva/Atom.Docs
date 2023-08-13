import Document, { Status } from '@src/models/Document';
import { IDocData, IDocSignData, docToDocDataShort } from '@src/dtos/doc.dto';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import DocSignService from './DocSignService';


// // **** Variables **** //

export const DOC_NOT_FOUND_ERR = 'Документ не найден';


/**
 * Change status for document.
 */
async function changeDocStatus(idDoc: number, newStatus: Status, comment: string): Promise<boolean> {
  const doc = await Document.findByPk(idDoc);
  if (doc !== null) {
    doc.status = newStatus;
    doc.comment = comment ?? null;
    await doc.save();
  } 
  return (doc !== null);
}

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

/**
 * Get documents for sign
 */
async function getForSign(signerId: number) {
  const docsForSign = await DocSignService.findDocsForSign(signerId);

  const docsObjectsForSign = Array();
  for (const docSign of docsForSign) {
    const doc = await Document.findByPk(docSign.docId);
    docsObjectsForSign.push(doc);
  }

  return docsObjectsForSign.map((doc) => {
    return docToDocDataShort(doc);
  })
}

/**
 * Get created documents
 */
async function getCreated(userId: number) {
  const docs = await Document.findAll({
    where: {
      ownerId: userId
    }
  });

  return docs.map((doc) => {
    return docToDocDataShort(doc);
  })
}

/**
 * Sign document.
 */
async function sign(docId: number, signData: IDocSignData) {
  const res = await DocSignService.changeStatus(docId, signData.id_user,
    Status.SIGNED, signData.comment);

  if (res.success) {
    const docSignedByAll = await DocSignService.docSignedByAll(docId);
    if (docSignedByAll) {
      await changeDocStatus(docId, Status.SIGNED, signData.comment);
    }
    else if ((res.oldStatus = Status.DECLINED) && (!(await DocSignService.docHasDeclines(docId)))) {
      await changeDocStatus(docId, Status.NEW, signData.comment);
    }
  }
}

/**
 * Decline document.
 */
async function decline(docId: number, declineData: IDocSignData) {
  const success = await DocSignService.changeStatus(docId, declineData.id_user,
    Status.DECLINED, declineData.comment);

  if (success) {
    await changeDocStatus(docId, Status.DECLINED, declineData.comment);
  }
}

/**
 * Get document by id
 */
async function getById(docId: number) {
  const doc = await Document.findByPk(docId);
  if (doc === null) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      DOC_NOT_FOUND_ERR,
    );
  }
  return doc;
}


// **** Export default **** //

export default {
  create,
  send,
  getCreated,
  getForSign,
  sign,
  decline,
  getById,
} as const;
