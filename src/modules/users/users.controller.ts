import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from '~core/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './services/auth.service';
import { CurrentUser } from '~core/decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '~core/guards/auth.guard';
import { Public } from '~core/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginResponseUserDto, LoginUserDto } from './dtos/login-user.dto';

@ApiTags('Users')
@Controller('auth')
@UseGuards(AuthGuard)

export class UsersController {
  constructor(
    private authService: AuthService,
  ) { }

  @Serialize(UserDto)
  @Get('/whoami')
  @ApiBearerAuth()
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Serialize(UserDto)
  @Public()
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return await this.authService.signup(body);
  }
  
  @Serialize(LoginResponseUserDto)
  @Public()
  @Post('/signin')
  async signin(@Body() body: LoginUserDto) {
    return  this.authService.signin(body.email, body.password);
  }

}
