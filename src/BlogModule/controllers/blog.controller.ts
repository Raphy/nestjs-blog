import {
    Get,
    Controller,
    Post,
    Put,
    Req,
    Body,
    Param,
    Delete,
} from '@nestjs/common';

import Paginate from './../../models/paginate.model';

import {
    ValidationPipe,
} from './../../pipes';

import {
    BlogModel,
} from './../models';

import {
    Blog,
} from './../entities';

import {
    BlogService,
} from './../services';

@Controller('admin/blog')
export default class BlogController {

    constructor(
        private readonly blogService : BlogService
    ) {}

    @Get('')
    async index(@Req() request) : Promise<Paginate> {
        return await this.blogService.paginate(request.query);
    }

    @Post('')
    async create(@Req() request, @Body(new ValidationPipe()) body : BlogModel) : Promise<Blog> {
        return await this.blogService.create({
            ...body,
            user: request.user,
        });
    }

    @Put(':id')
    async update(@Param('id') id: string, @Req() request, @Body(new ValidationPipe()) body : BlogModel)
    : Promise<Blog> {
        return await this.blogService.update(id, body);
    }

    @Get(':id')
    async show(@Param('id') id: string) : Promise<Blog> {
        return await this.blogService.findOneById(id);
    }

    @Delete(':id')
    async destroy(@Param('id') id: string) : Promise<void> {
        return await this.blogService.destroy(id);
    }
}