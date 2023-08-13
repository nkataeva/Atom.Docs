import Document from "@src/models/Document";

// Данные документа
export interface IDocData {
  id_user: number;
  id_type: number;
  name: string;

  extra: {
    name_org: string,
    content: string,
    reason: string,
    dt_start: Date,
    duration: number
  };

  signers: number[];
}

// Данные о подписи/отклонение документа
export interface IDocSignData {
  id_user: number;
  comment: string;
}

// Данные, возвращаемые клиенту
export interface IDocDataShort {
  id: number;
  id_type: number;
  id_user: number;
  name: string;
  dt_create: Date;
}

// Преобразование Document в IDocDataShort
export function docToDocDataShort(doc: Document): IDocDataShort {

  return { 
      id: doc.id,
      id_type: doc.typeId,
      id_user: doc.ownerId,
      name: doc.name,
      dt_create: doc.creationDate
  }

}