import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EntityId } from 'typeorm/repository/EntityId';
import { UsersService } from '~modules/users/services/users.service';

export interface AuthPayload {
    id: EntityId;
}

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor(
       readonly configService: ConfigService,
       private readonly userService:UsersService
    ) {
        const secretOrKey = configService.get<string>('jwtSecretKey');
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey,
        });
    }
    async validate(payload: AuthPayload): Promise<AuthPayload> {
        if (payload == null) {
            throw new UnauthorizedException("the user is not login");
        }
        return this.userService.findById(payload.id);

    }
}
