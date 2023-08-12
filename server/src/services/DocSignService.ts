import DocSign from '@src/models/DocSign';

/**
 * Create new document.
 */
async function create(docId: number, signerId: number) {
  const docSign = await DocSign.create(
    {
       docId: docId,
       signerId: signerId
     }
   );
  
   return docSign;
 }

 // **** Export default **** //

export default {
    create,
 } as const;
 
 