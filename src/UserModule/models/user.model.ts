import {
    IsEmail,
    Length,
    IsBoolean,
    MinLength,
} from 'class-validator';
import {
    ObjectID,
} from "typeorm";

export default class UserModel {

    readonly id: ObjectID;

    @Length(2, 20)
    readonly firstname: string;

    @Length(2, 20)
    readonly lastname: string;

    @IsBoolean()
    readonly active: boolean = true;

    @IsEmail()
    readonly email: string;

    @MinLength(8)
    readonly password: string;

}