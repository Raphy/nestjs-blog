import {Get, Controller, Res} from '@nestjs/common';

@Controller('')
export default class AppController {

    @Get()
    async index(@Res() response) {
        return await response.render('index', {

        });
    };
}
