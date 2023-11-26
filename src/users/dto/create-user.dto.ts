import {ApiProperty} from "@nestjs/swagger";
import * as Joi from "joi";

export class CreateUserDto {
    @ApiProperty({
        description: 'Роль пользователя'
    })
    role:string

    @ApiProperty({
        description: 'ФИО пользователя'
    })
    name:string

    @ApiProperty({
        description: 'Email пользователя'
    })
    email:string

    @ApiProperty({
        description: 'Пароль пользователя'
    })
    password:string
}

export const CreateUserSchema = Joi.object({
    role: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});