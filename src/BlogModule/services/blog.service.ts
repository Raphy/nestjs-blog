import {
    Component,
    NotFoundException,
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
            pages: total % params.take,
        });
    }

    async create(params : BlogModel) : Blog {
        return await this.blogRepository.save(this.blogRepository.create(params));
    }

    async update(id : string, params : BlogModel) : Promise<Blog> {
        let blog = await this.findOneById(id);

        if (!blog) throw new NotFoundException();

        blog = {
            ...blog,
            ...params,
        };

        await this.blogRepository.save(blog);

        return blog;
    }

    async destroy(id : string) : Promise<void> {
        return await this.blogRepository.deleteById(id);
    }

    async findOneById(id: string): Promise<Blog> {
        return await this.blogRepository.findOneById(id);
    }

    async findBySlug(slug : string) : Promise<Blog> {
        return await this.blogRepository.findOne({
            slug: slug,
        });
    }
}