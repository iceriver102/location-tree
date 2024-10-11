import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository, BaseTreeRepository } from '~core/base/base.repository';
import { User } from '~modules/users/user.entity';
import { Location } from "~modules/locations/location.entity";

@Injectable()
export class DataService {
    constructor(
        @InjectRepository(User) public readonly users: BaseRepository<User>,
        @InjectRepository(Location) public readonly locations: BaseTreeRepository<Location>
    ) {
    }
}