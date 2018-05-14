import {
	NestFactory,
} from '@nestjs/core';
import {
	INestApplication,
} from '@nestjs/common';
import ApplicationModule from './app.module';
const program = require('commander');
import {version} from './../package.json';
const prompt = require('prompt');

import UserModule from './UserModule/user.module';
import UserService from './UserModule/services/user.service';

console.log('awaiting nest application');

async function bootstrap(): Promise<INestApplication> {
	const app = await NestFactory.create(ApplicationModule);

	program.version(version);

	program.command('user:create')
		.description('Creates a new admin user')
		.action((options) => {

			console.log('Creating new user');

			prompt.start();

			prompt.get([
				{
					name: 'firstname',
					required: true,
				},
				{
					name: 'lastname',
					required: true,
				},
				{
					name: 'email',
					validator: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
					warning: 'Please enter a valid email address',
					required: true,
				},
				{
					name: 'password',
					hidden: true,
					replace: '*',
					required: true,
				},
			], async (err, result) => {
				if (err) console.error(err);

				const userService = app.select(UserModule).get(UserService, {
					strict: true,
				});

				const user = await userService.create(result);

				if (typeof(user) !== 'undefined') console.log(`User was created with ID ${user.id}`);
				else console.log('creation failed');

				process.exit(0);

			});
		});

	program.parse(process.argv);
}

bootstrap();