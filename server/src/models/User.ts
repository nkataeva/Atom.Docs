import { Table, AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Unique } from "sequelize-typescript";

@Table({tableName: "users"})
export default class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @AllowNull(false)
    @Column(DataType.STRING)
    login!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    email!: string

    @AllowNull(false)    
    @Column(DataType.STRING)
    fio!: string;

    @AllowNull(false)    
    @Column(DataType.STRING)
    pwdHash!: string
}