import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @ApiProperty({
        description: 'Название книги'
    })
    name:string

    @ApiProperty({
        description: 'Краткое описание книги'
    })
    description:string

    @ApiProperty({
        description: 'ID жанра'
    })
    genreId:number

    @ApiProperty({
        description: 'ID автора'
    })
    userId:number

}
