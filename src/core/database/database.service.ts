import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository, BaseTreeRepository } from '~core/base/base.repository';
import { Location } from "~modules/locations/location.entity";

@Injectable()
export class DataService {
    constructor(
        @InjectRepository(Location) public readonly locations: BaseTreeRepository<Location>
    ) {
    }
}