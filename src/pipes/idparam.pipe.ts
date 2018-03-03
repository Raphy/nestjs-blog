import {
    PipeTransform,
    Pipe,
    ArgumentMetadata,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common';

@Pipe()
export default class IDParamPipe implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {

        if (typeof value !== 'string' || ![12, 24].includes(value.length)) {
            throw new BadRequestException('Incorrect Param ID');
        }
        return value;
    }
}