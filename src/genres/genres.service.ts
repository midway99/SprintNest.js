import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Genre} from "./entities/genre.entity";
import {Repository} from "typeorm";
import * as moment from "moment";

@Injectable()
export class GenresService {
  constructor(
     @InjectRepository(Genre)
     private repository:Repository<Genre>
  ) {}

  create(data: CreateGenreDto) {
    return this.repository.save(data);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, data: UpdateGenreDto) {
    return this.repository.save({...data,id});
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
