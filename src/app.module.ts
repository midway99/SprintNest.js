import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {User} from "./users/entities/user.entity";
import { BooksModule } from './books/books.module';
import { GenresModule } from './genres/genres.module';
import {Book} from "./books/entities/book.entity";
import {Genre} from "./genres/entities/genre.entity";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DBNAME,
            entities: [User, Book, Genre],
            synchronize: JSON.parse(process.env.DB_SYNCHRONIZE.toLowerCase()),
        }),
        UsersModule,
        BooksModule,
        GenresModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
