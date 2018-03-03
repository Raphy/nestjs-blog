import {
    IsNumber,
    IsArray,
} from 'class-validator';

export default class Paginate {

    @IsNumber()
    total: number;

    @IsNumber()
    count: number;

    @IsArray()
    items;

    @IsNumber()
    pages : number;

    constructor(params : object = {}) {

        if (params.hasOwnProperty('items')) this.items = params.items;
        if (params.hasOwnProperty('total')) this.items = params.total;
        if (params.hasOwnProperty('count')) this.items = params.count;
        if (params.hasOwnProperty('pages')) this.items = params.pages;

    }
}