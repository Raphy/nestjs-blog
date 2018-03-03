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

        //TODO get user from auth: not sure how to get that user from the middleware?
        //Possibly in request? or I can put it there? possible
        //const user = await this.userService.findByEmail();
        return request.user;
    }
}