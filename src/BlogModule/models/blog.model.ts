import {
    IsString,
    Length,
} from 'class-validator';

import {
    UserEntity as User,
} from './../../UserModule/entities';

export default class BlogModel {

    readonly id: string;

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