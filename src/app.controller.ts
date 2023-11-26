import {Body, Controller, Get, Post, Request, UseGuards, UsePipes} from '@nestjs/common';
import { AppService } from './app.service';
import {CreateUserDto, CreateUserSchema} from "./users/dto/create-user.dto";
import { UsersService } from './users/users.service';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import { AuthService } from './auth/auth.service';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {User as userEntity} from "./users/entities/user.entity";
import {JoiValidationPipe} from "./pipes/ValidationPipe";

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly usersService: UsersService,
      private authService: AuthService
  ) {}

  @ApiResponse({status: 201, description: 'Пользователь зарегистрирован', type: userEntity})
  @Post('auth/register')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
