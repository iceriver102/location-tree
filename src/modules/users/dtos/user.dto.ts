import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  @ApiProperty({name:"id", description:"The id of user"})
  id: string;

  @Expose()
  @ApiProperty({name:"email", description:"The email of user login to system"})
  email: string;
}
