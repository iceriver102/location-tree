import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { UserEmailDuplicate } from '../validators/user.email.duplicate';

export class CreateUserDto {
  @IsEmail()
  @UserEmailDuplicate()
  email: string;

  @IsString()
  @MaxLength(64, { message: "password too long" })
  @MinLength(8, { message: "password too short" })
  password: string;
}
