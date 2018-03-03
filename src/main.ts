import * as express from 'express';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import ApplicationModule from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);

	app.use(express.static(path.join(__dirname, 'public')));
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	await app.listen(3000, () => {
		console.log('    ___         __    __     _       __   _');
		console.log('   /   |  _____/ /_  / /__  (_)___ _/ /_ ( )_____');
		console.log('  / /| | / ___/ __ \\/ / _ \\/ / __ `/ __ \\|// ___/');
		console.log(' / ___ |(__  ) / / / /  __/ / /_/ / / / / (__  )');
		console.log('/_/ _|_|/___/_/ /_/_/\\___/_/\\__, /_/ /_/ /____/');
		console.log('   / ____/  ______  _______/__/_/_______');
		console.log('  / __/ | |/_/ __ \\/ ___/ _ \\/ ___/ ___/');
		console.log(' / /____>  </ /_/ / /  /  __(__  |__  )');
		console.log('/_____/_/|_/ .___/_/   \\___/____/____/');
		console.log('   _______/_/______   _____  _____');
		console.log('  / ___/ _ \\/ ___/ | / / _ \\/ ___/');
		console.log(' (__  )  __/ /   | |/ /  __/ /');
		console.log('/____/\\___/_/    |___/\\___/_/');
	});
}
bootstrap();
