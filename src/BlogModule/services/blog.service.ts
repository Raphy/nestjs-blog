import {
    Component,
} from '@nestjs/common';

import {
    InjectRepository,
} from '@nestjs/typeorm';

import {
    Repository,
    FindManyOptions,
} from 'typeorm';

import {
    Blog,
} from '../entities';

import {
    BlogModel,
} from '../models';

import Paginate from './../../models/paginate.model';

@Component()
export default class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository : Repository<Blog>
    ) {}

    async paginate(params : FindManyOptions<Blog> = {take: 10, skip: 0}) : Promise<Paginate> {

        if (params.take > 100) params.take = 100;
        params.skip = params.skip * params.take;

        const blogs = await this.blogRepository.find(params);

        const total = await this.blogRepository.count();

        return new Paginate({
            items: blogs,
            count: blogs.length,
            total: total,
            pages: (params.skip + 1) / total,
        });
    }

    async create
}