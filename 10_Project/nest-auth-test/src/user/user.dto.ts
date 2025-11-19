import { IsEmail, IsEmpty, IsNotEmpty, IsString, Length } from 'class-validator'


export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    username: string;
}


export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    password: string
}