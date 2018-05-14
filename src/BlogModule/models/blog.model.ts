import {
    IsString,
    Length,
} from 'class-validator';

import {
    UserEntity as User,
} from './../../UserModule/entities';
import {
    ObjectID,
} from "typeorm";

export default class BlogModel {

    readonly id: ObjectID;

    @IsString()
    @Length(2, 200)
    readonly title: string;

    @IsString()
    @Length(2, 200)
    readonly slug: string;

    @IsString()
    body;

    user: User;
}