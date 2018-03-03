import { Module } from '@nestjs/common';
import {
    TypeOrmModule,
} from '@nestjs/typeorm';

import * as controllers from './controllers';
import * as entities from './entities';
import * as services from './services';

@Module({
    imports: [
        TypeOrmModule.forFeature(entities),
    ],
    controllers: controllers,
    components: services,
})
export default class BlogModule {
}