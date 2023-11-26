import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        description: 'Роль'
    })
    role:string

    @ApiProperty({
        description: 'ФИО'
    })
    name:string

    @ApiProperty({
        description: 'Email'
    })
    email:string

    @ApiProperty({
        description: 'Пароль'
    })
    password:string
}
