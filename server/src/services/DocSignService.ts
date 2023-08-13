import DocSign from '@src/models/DocSign';
import { Status } from '@src/models/Document';
import { Op } from 'sequelize';


/**
 * Create new document.
 */
async function create(idDoc: number, idSigner: number) {
  const docSign = await DocSign.create(
    {
      docId: idDoc,
      signerId: idSigner
    }
  );

  return docSign;
}

/**
 * Get docs for sign
 */
async function findDocsForSign(idSigner: number) {
  return DocSign.findAll({
    where: {
      signerId: idSigner,
      status: Status.NEW
    }
  })
}

/**
 * Sign doc
 */
async function changeStatus(idDoc: number, idSigner: number, newStatus: Status, comment: string): Promise<{success: boolean, oldStatus: Status | null}> {
  const docForSign = await DocSign.findOne({
    where: {
      docId: idDoc,
      signerId: idSigner
    }
  });

  let oldStatusValue = null;

  if (docForSign !== null) {
    oldStatusValue = docForSign.status;

    docForSign.status = newStatus;
    docForSign.comment = comment ?? null;
    await docForSign.save();
  }

  return { success: (docForSign !== null), oldStatus: oldStatusValue };
}

/**
 * Test if doc signed by all
 */
async function docSignedByAll(idDoc: number): Promise<boolean> {
  const notSigned = await DocSign.findAll({
    where: {
      docId: idDoc,
      status: {
        [Op.or]: [Status.NEW, Status.DECLINED]
      }
    }
  })

  return (notSigned.length == 0);
}

/**
 * Test if doc has declines
 */
async function docHasDeclines(idDoc: number): Promise<boolean> {
  const declinedSigns = await DocSign.findAll({
    where: {
      docId: idDoc,
      status: Status.DECLINED      
    }
  });

  return (declinedSigns.length != 0);
}


// **** Export default **** //

export default {
  create,
  findDocsForSign,
  changeStatus,
  docSignedByAll,
  docHasDeclines,
} as const;

