import { Module } from '@nestjs/common';
import {
    TypeOrmModule,
} from '@nestjs/typeorm';

import * as controllers from './controllers';
import * as entities from './entities';
import * as services from './services';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            entities.Blog,
        ]),
    ],
    controllers: [
        controllers.BlogController,
    ],
    components: [
        services.BlogService,
    ],
})
export default class BlogModule {
}
