import * as passport from 'passport';
import {
    Module,
    NestModule,
    MiddlewaresConsumer,
    RequestMethod,
} from '@nestjs/common';
import {
    TypeOrmModule,
} from '@nestjs/typeorm';

import * as controllers from './controllers';
import {
    UserEntity as User,
} from './entities';
import * as services from './services';

import ConfigModule from '@bashleigh/nest-config';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
        ]),
        ConfigModule,
    ],
    controllers: [
        controllers.UserController,
        controllers.AuthController,
    ],
    components: [
        services.UserService,
        services.AuthService,
        services.JwtStrategy,
    ],
})
export default class UserModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(
                { path: '/admin', method: RequestMethod.ALL },
                { path: '/admin/user', method: RequestMethod.ALL },
                { path: '/admin/blog', method: RequestMethod.ALL },
                { path: '/auth/me', method: RequestMethod.ALL }
            );
    }
}
