import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Book} from "./entities/book.entity";
import * as moment from 'moment';

@Injectable()
export class BooksService {
  constructor(
      @InjectRepository(Book)
      private repository: Repository<Book>
  ) {}

  create(data: CreateBookDto) {
    return this.repository.save({
        ...data,
        created_at:moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at:moment().format('YYYY-MM-DD HH:mm:ss')
    });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, data: UpdateBookDto) {
    return this.repository.save({...data,id});
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
