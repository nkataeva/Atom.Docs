import { Table, AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Unique, Default } from "sequelize-typescript";

@Table({tableName: "users"})
export default class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @Column(DataType.STRING)
    login!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    email!: string

    @Column(DataType.STRING)
    fio!: string;

    @Column(DataType.STRING)
    pwdHash!: string
   
 //   @Default(UserRoles.USER)
    // @AllowNull(false)
    // @Column(DataType.ENUM(
    //     UserRoles.USER,
    //     UserRoles.ADMIN
    // ))
    // role!: UserRoles

}