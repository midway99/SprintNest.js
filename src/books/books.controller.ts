import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes} from '@nestjs/common';
import {BooksService} from './books.service';
import {CreateBookDto, CreateBookSchema} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {Roles} from "../decorators/roles.decorator";
import {Role} from "../enums/role.enum";
import {RolesGuard} from "../roles/roles.guard";
import { ApiTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Book as bookEntity } from "./entities/book.entity";
import {JoiValidationPipe} from "../pipes/ValidationPipe";

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
@UseGuards(JwtAuthGuard,RolesGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiResponse({status: 201, description: 'Книга успешно добавлена', type: bookEntity})
  @ApiResponse({status: 401, description: 'Неавторизован'})
  @Post()
  @Roles(Role.Admin)
  @UsePipes(new JoiValidationPipe(CreateBookSchema))
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id', ParseIntPipe) id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.booksService.remove(+id);
  }
}
