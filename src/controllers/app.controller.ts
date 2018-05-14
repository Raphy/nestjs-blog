import {
    Get,
    Controller,
    Res,
} from '@nestjs/common';
const manifest = require(process.cwd() + '/public/build/manifest.json');

@Controller('')
export default class AppController {

    @Get()
    async index(@Res() response) {
        return await response.render('index', {
            manifest: manifest,
        });
    };
}
