import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
} from '@nestjs/typeorm';
import {
  Connection,
} from 'typeorm';
import ConfigModule from '@bashleigh/nest-config';

import AppController from './controllers/app.controller';

import UserModule from './UserModule/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule,
    UserModule,
  ],
  controllers: [
      AppController,
  ],
  components: [],
  exports: [],
})
export default class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}
