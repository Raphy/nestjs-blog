import {
    Component,
    NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import {
    InjectRepository,
} from '@nestjs/typeorm';

import {
    Repository,
    FindManyOptions,
} from 'typeorm';

import User from './../entities/user.entity';

import UserModel from './../models/user.model';

import Paginate from './../../models/paginate.model';

import {
    ConfigService,
} from '@bashleigh/nest-config';

@Component()
export default class UserService {

    private saltRounds = 10;

    constructor(
        private readonly config : ConfigService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async paginate(params: FindManyOptions<User> = {take: 10, skip: 0}): Promise<Paginate> {

        if (!params.hasOwnProperty('take')) params.take = parseInt(this.config.get('PAGINATE_DEFAULT', 10));
        if (!params.hasOwnProperty('skip')) params.skip = 0;
        if (typeof(params.take) !== 'number') params.take = parseInt(params.take);

        if (params.take > parseInt(this.config.get('PAGINATE_MAX', 100)))
            params.take = parseInt(this.config.get('PAGINATE_MAX', 100));

        params.skip = params.skip * params.take;

        const users = await this.userRepository.find(params);

        const total = await this.userRepository.count();

        return new Paginate({
            items: users,
            count: users.length,
            total: total,
            pages: Math.round(total / params.take),
        });
    }

    async create(params: UserModel): Promise<User> {

        const user = this.userRepository.create(params);

        user.password = await this.getHash(user.password);

        try {
            const result = await this.userRepository.save(user);

            delete result.password;

            return result;

        } catch(e) {
            //TODO Catch mongo unique exception and throw a 422 for duplicated entity
        }
    }

    async update(id: string, params: UserModel) : Promise<User> {
        let user = await this.findOneById(id);

        if (!user) throw new NotFoundException('entity not found');

        user = {
            ...user,
            ...params,
        };

        if (params.hasOwnProperty('password'))
            user.password = await this.getHash(user.password);

        await this.userRepository.save(user);
        delete user.password;

        return user;
    }

    async destroy(id : string) : Promise<void> {
        return await this.userRepository.deleteById(id);
    }

    async getHash(password: string|undefined): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async findOneById(id: string): Promise<User> {
        return await this.userRepository.findOneById(id);
    }

    async findByEmail(email : string) : Promise<User>|null {
        return await this.userRepository.findOne({
            email: email,
        });
    }
}