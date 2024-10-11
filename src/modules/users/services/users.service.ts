import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user.entity';
import { plainToClass } from 'class-transformer';
import { bcrypt } from "~core/utils"
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { EntityId } from 'typeorm/repository/EntityId';
import { DataService } from '~core/database/database.service';
import { BaseService } from '~core/base/base.service';

@Injectable()
export class UsersService extends BaseService<User> {
    constructor(private readonly database: DataService, private readonly configService: ConfigService) {
        super(database.users)
    }

    async create(dto: CreateUserDto) {
        const entity = plainToClass(User, dto, { excludeExtraneousValues: true, exposeUnsetFields: false, })
        const bcryptData = await bcrypt.hash(dto.password, this.configService.get<number>("bcryptSalt"));
        entity.password = bcryptData.hash;
        const user = this.database.users.create(entity);
        return this.database.users.save(user);
    }

    async findOne(id: EntityId) {
        return this.database.users.findOne({ where: { id } })
    }

    // async update(id: EntityId, attrs: UpdateUserDto) {
    //     const user = await this.database.users.findOne({ where: { id } });
    //     if (!user) {
    //         throw new NotFoundException('user not found');
    //     }
    //     const dto = plainToClass(User, attrs, {
    //         excludeExtraneousValues: true,
    //         exposeUnsetFields: false,
    //     });

    //     if (attrs.password != null && attrs.password != '') {
    //         const bcryptData = await bcrypt.hash(attrs.password, this.configService.get<number>("bcryptSalt"));
    //         dto.password = bcryptData.hash;
    //     }
    //     return this.database.users.update(user.id, dto);
    // }

    // async remove(id: EntityId) {
    //     const user = await this.database.users.findOne({ where: { id } });
    //     if (!user) {
    //         throw new NotFoundException('user not found');
    //     }
    //     return this.database.users.remove(user);
    // }
}
