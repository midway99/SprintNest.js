import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {Genre} from "../../genres/entities/genre.entity";
import {User} from "../../users/entities/user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Book {
    @ApiProperty({
        minimum: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    description: string;

    @ManyToOne(type => Genre, genre => genre.books, {eager: true})
    genre: Genre

    @ManyToOne(type => User, user => user.books, {eager: true})
    user: User

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
