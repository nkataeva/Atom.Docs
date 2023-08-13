import { Table, AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Default } from "sequelize-typescript";
import { Status } from "./Document";

@Table({tableName: "doc_signs"})
export default class DocSign extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @AllowNull(false)
    @Column(DataType.INTEGER)
    signerId!: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    docId!: number

    // статус
    @Default(Status.NEW)
    @AllowNull(false)
    @Column(DataType.SMALLINT)
    status!: number;

    // статус
    @Column(DataType.TEXT)
    comment!: string;
}