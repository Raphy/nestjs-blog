import {
    Controller,
    Post,
    Body,
    Get,
    Req,
} from '@nestjs/common';

import {
    AuthService,
    UserService,
} from './../services';

import {
    AuthModel as Auth,
} from './../models';

import {
    UserEntity as User,
} from './../entities';

import {
    ValidationPipe
} from './../../pipes';

@Controller('auth')
export default class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('login')
    async login(@Body(new ValidationPipe()) body : Auth) : Promise<object> {
        return await this.authService.auth(body);
    }

    @Get('me')
    me(@Req() request) : User {
        return request.user;
    }
}