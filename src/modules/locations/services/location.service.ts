import { BaseService } from "~core/base/base.service";
import { DataService } from "~core/database/database.service";
import { Location } from "../location.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateLocationDTO } from "../dtos/create-location.dto";
import { plainToInstance } from "class-transformer";
import { UpdateLocationDto } from "../dtos/update-location.dto";
import { Equal, IsNull, Not } from "typeorm";

@Injectable()
export class LocationService extends BaseService<Location> {
    constructor(private readonly database: DataService) {
        super(database.locations)
    }
    async updateNode(id: string, dto: UpdateLocationDto) {
        const node = await this.findById(id);
        if (node == null) {
            throw new NotFoundException("the location is not found")
        }
        if (dto.locationNumber != undefined && node.locationNumber != dto.locationNumber) {
            const countNode = await this.repo.count({ where: { locationNumber: dto.locationNumber, id: Not(Equal(id)) } })
            if (countNode > 0) {
                throw new BadRequestException("Location number is exist")
            }
        }
        const loc = plainToInstance(Location, dto, { excludeExtraneousValues: true, exposeUnsetFields: false });
        if (dto.parentId != node.parent?.id) {
            const parentLoc = await this.findById(dto.parentId);
            if (parentLoc == null) {
                throw new BadRequestException("the parent location is not found")
            }
            loc.parent = parentLoc;
        }
        return this.database.locations.update(id, loc)
    }

    async create(dto: CreateLocationDTO, parentId?: string): Promise<Location> {
        if (dto.parentId == null) {
            const rootNode = await this.repo.count({ where: { parent: IsNull() } })
            if (rootNode > 0) {
                throw new BadRequestException("Location tree is exist please create descendants node")
            }
        }

        const node = plainToInstance(Location, dto, { excludeExtraneousValues: true, exposeUnsetFields: false });
        if (parentId) {
            const parent = await this.findById(parentId);
            node.parent = parent;
        }
        return this.database.locations.save(node);
    }

    public async findTrees() {
        return this.database.locations.findTrees()
    }
}