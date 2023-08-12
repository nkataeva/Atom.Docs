import { Table, AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Default } from "sequelize-typescript";

// Статус документа
export enum Status {
    NEW,
    SIGNED,
    DECLINED
}

@Table({ tableName: "documents" })
export default class Document extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    // тип
    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    // тип
    @AllowNull(false)
    @Column(DataType.SMALLINT)
    typeId!: number;

    // статус
    @Default(Status.NEW)
    @AllowNull(false)
    @Column(DataType.SMALLINT)
    status!: number;

    // создатель
    @AllowNull(false)    
    @Column(DataType.INTEGER)  
    ownerId!: number;

    // дата создания
    @AllowNull(false)
    @Column(DataType.DATE)
    creationDate!: Date;

    // комментарий
    @Column(DataType.STRING)    
    comment!: string;

/* ----------------------------------------------------- */
/* Доп.свойства - планируется первод в отдельную таблицу */
/* ----------------------------------------------------- */

    // дата начала отпуска
    @Column(DataType.DATE)    
    vacationBeginDate!: Date;

    // продолжительность
    @Column(DataType.INTEGER)    
    vacationDuration!: number;

    // содержание
    @Column(DataType.TEXT)
    content!: string;

    // обоснование 
    @Column(DataType.TEXT)
    reason!: string;

    // обоснование 
    @Column(DataType.STRING)
    orgName!: string;   
}