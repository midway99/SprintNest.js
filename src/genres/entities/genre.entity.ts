import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Book} from "../../books/entities/book.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Genre {
    @ApiProperty({
        minimum: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @OneToMany(type => Book, book => book.genre)
    books: Book

    @ApiProperty()
    @Column({
        type: 'datetime'
    })
    created_at : Date

    @ApiProperty()
    @Column({
        type: 'datetime'
    })
    updated_at : Date
}
