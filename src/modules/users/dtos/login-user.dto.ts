import { Expose, Type } from "class-transformer";
import { UserDto } from "./user.dto";
import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseUserDto {
    @Expose()
    token: string;

    @Expose()
    @Type(() => UserDto)
    user: UserDto
}

export class LoginUserDto {
    @ApiProperty({ name: "email", example: "admin@gmail.com", description: "Email login to system", required: true })
    @IsEmail(undefined, { message: "email is incorrect" })
    email: string;

    @IsString()
    @ApiProperty({ name: "password", example: "admin", description: "Password of user", required: true })
    password: string;
}