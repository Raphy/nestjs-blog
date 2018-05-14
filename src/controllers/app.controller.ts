import {
    Get,
    Controller,
    Res,
} from '@nestjs/common';
const fs = require('fs');

@Controller('')
export default class AppController {

    @Get()
    async index(@Res() response) {

        const manifest = JSON.parse(fs.readFileSync(process.cwd() + '/public/build/manifest.json', 'utf8'));

        return await response.render('index', {
            manifest: manifest,
        });
    };
}
