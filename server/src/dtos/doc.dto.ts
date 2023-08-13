// Данные документа
export interface IDocData {
    id_user: number;
    id_type: number;
    name: string;

    extra: {
      name_org: string,
      content: string,
      reason:  string,
      dt_start: Date,
      duration: number
    };
    
    signers: number[];
}
