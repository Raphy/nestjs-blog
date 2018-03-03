import * as express from 'express';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import ApplicationModule from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);

	app.use(express.static(path.join(__dirname, 'public')));
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	//TODO get config service of out application and use env for PORT

	await app.listen(3000, () => {
		console.log('listening on port 3000');
	});
}
bootstrap();
