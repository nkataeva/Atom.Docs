import DocSign from '@src/models/DocSign';

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
            status: 0
        }
    })
}
  

 // **** Export default **** //

export default {
    create,
    findDocsForSign,
} as const;
 
 