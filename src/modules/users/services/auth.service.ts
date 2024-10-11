import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { bcrypt } from '~core/utils';
import { AuthPayload } from '~core/strategies/jwt.strategy';
import { JwtService } from "@nestjs/jwt"
import { DataService } from '~core/database/database.service';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private readonly jwtService: JwtService, private readonly database: DataService) { }

    async signup(dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    async generateToken(user: User): Promise<string> {
        const payload: AuthPayload = {
            id: user.id
        };
        return this.jwtService.sign(payload);
    }

    async signin(email: string, password: string) {
        const user = await this.database.users.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('user not found');
        }

        const flag = await bcrypt.compare(user.password, password)
        if (!flag) {
            throw new BadRequestException('password not match');
        }
        const token = await this.generateToken(user)
        return { user, token };
    }
}
