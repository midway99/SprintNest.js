import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ParseIntPipe} from '@nestjs/common';
import { GenresService } from './genres.service';
import {CreateGenreDto, CreateGenreSchema} from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import {Roles} from "../decorators/roles.decorator";
import {Role} from "../enums/role.enum";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../roles/roles.guard";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JoiValidationPipe} from "../pipes/ValidationPipe";

@ApiTags('Genres')
@ApiBearerAuth()
@Controller('genres')
@UseGuards(JwtAuthGuard,RolesGuard)
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @Roles(Role.Admin)
  @UsePipes(new JoiValidationPipe(CreateGenreSchema))
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.genresService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id', ParseIntPipe) id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.genresService.remove(+id);
  }
}
