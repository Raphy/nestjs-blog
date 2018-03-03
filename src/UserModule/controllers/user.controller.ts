import {
    Controller,
    Req,
    Get,
    Body,
    Post,
    Param,
    Put,
    Delete,
} from '@nestjs/common';

import {UserService} from './../services';

import Paginate from './../../models/paginate.model';

import {
    ValidationPipe,
    IDParamPipe,
} from './../../pipes';

import {
    UserModel,
} from './../models';

import {
    UserEntity as User,
} from './../entities';

@Controller('admin/user')
export default class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Get('')
    async index(@Req() request) : Promise<Paginate> {
        return await this.userService.paginate(request.query);
    }

    @Post('')
    async create(@Body(new ValidationPipe()) body : UserModel) : Promise<User> {
        return await this.userService.create(body);
    }

    @Put(':id')
    async update(@Param('id', new IDParamPipe()) id : string, @Body(new ValidationPipe) body : UserModel)
    : Promise<User> {
        return await this.userService.update(id, body);
    }

    @Get(':id')
    async show(@Param('id', new IDParamPipe()) id : string) : Promise<User> {
        return await this.userService.findOneById(id);
    }

    @Delete(':id')
    async destroy(@Param('id', new IDParamPipe()) id : string) : Promise<void> {
        return await this.userService.destroy(id);
    }
}