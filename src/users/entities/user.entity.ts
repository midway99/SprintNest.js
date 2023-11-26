import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Book} from "../../books/entities/book.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class User {
    @ApiProperty({
        minimum: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    role: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @Column()
    password: string;

    @OneToMany(type => Book, book => book.user)
    books: Book

    @Column({
        type: 'datetime'
    })
    created_at : Date

    @Column({
        type: 'datetime'
    })
    updated_at : Date
}
