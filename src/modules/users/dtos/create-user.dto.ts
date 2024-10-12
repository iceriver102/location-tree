import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { UserEmailDuplicate } from '../validators/user.email.duplicate';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateUserDto {
  @Expose()
  @IsEmail()
  @UserEmailDuplicate()
  @ApiProperty({name:"email", example:"admin@gmail.com", description:"Email login to system", required: true})
  email: string;

  @Expose()
  @IsString()
  @ApiProperty({name:"password", example:"Admin@1234", description:"Password of user",  required: true})
  @MaxLength(64, { message: "password too long" })
  @MinLength(8, { message: "password too short" })
  password: string;
}
