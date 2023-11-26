import {Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ParseIntPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {Roles} from "../decorators/roles.decorator";
import {Role} from "../enums/role.enum";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../roles/roles.guard";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard,RolesGuard)
export class UsersController {
  constructor(
      private readonly usersService: UsersService
  ) {}

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id);
  }
}
