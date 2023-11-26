import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.dto';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
    @ApiProperty({
        description: 'Название жанра книги'
    })
    name:string
}
