import { Expose, Type } from "class-transformer";
import { UserDto } from "./user.dto";
import { IsEmail, IsString } from "class-validator";

export class LoginResponseUserDto {
    @Expose()
    token: string;

    @Expose()
    @Type(() => UserDto)
    user: UserDto
}

export class LoginUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}