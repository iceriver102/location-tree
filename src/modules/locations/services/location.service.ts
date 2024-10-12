import { BaseService } from "~core/base/base.service";
import { DataService } from "~core/database/database.service";
import { Location } from "../location.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateLocationDTO } from "../dtos/create-location.dto";
import { plainToInstance } from "class-transformer";
import { UpdateLocationDto } from "../dtos/update-location.dto";
import { User } from "~modules/users/user.entity";
import { Equal, IsNull, Not } from "typeorm";
import { EntityId } from "typeorm/repository/EntityId";

@Injectable()
export class LocationService extends BaseService<Location> {
    constructor(private readonly database: DataService) {
        super(database.locations)
    }

    async findOwnerById(id: EntityId, owner:User ) {
        const where = { id,  createBy: { id: owner.id } };
        return this.repo.findOne({ where })
    }

    async updateNode(id: string, dto: UpdateLocationDto, owner: User) {
        const node = await this.findOwnerById(id, owner);
        if (node == null) {
            throw new NotFoundException("the location is not found")
        }
        if (dto.locationNumber != undefined && node.locationNumber != dto.locationNumber) {
            const countNode = await this.repo.count({ where: { createBy: { id: owner.id }, locationNumber: dto.locationNumber, id: Not(Equal(id)) } })
            if (countNode > 0) {
                throw new BadRequestException("Location number is exist")
            }
        }
        const loc = plainToInstance(Location, dto, { excludeExtraneousValues: true, exposeUnsetFields: false });
        if (dto.parentId != node.parent?.id) {
            if (dto.parentId != null) {
                const parentLoc = await this.findOwnerById(dto.parentId, owner);
                if (parentLoc == null) {
                    throw new BadRequestException("the parent location is not found")
                }
                loc.parent = parentLoc;
            }
        }
        return this.database.locations.update(id, loc)
    }

    async create(dto: CreateLocationDTO, owner: User, parentId?: string): Promise<Location> {
        if (dto.parentId == null) {
            const rootNode = await this.repo.count({ where: { createBy: { id: owner.id }, parent: IsNull() } })
            if (rootNode > 0) {
                throw new BadRequestException("Location tree is exist please create descendants node")
            }
        }
        const countNode = await this.repo.count({ where: { createBy: { id: owner.id }, locationNumber: dto.locationNumber } })
        if (countNode > 0) {
            throw new BadRequestException("Location number is exist")
        }
        const loc = plainToInstance(Location, dto, { excludeExtraneousValues: true, exposeUnsetFields: false });
        loc.createBy = owner;
        if (parentId) {
            const parent = await this.findOwnerById(parentId, owner);
            if (parent == null) {
                throw new BadRequestException("the parent location is not found")
            }
            loc.parent = parent;
        }
        return this.database.locations.save(loc);
    }

    public async findAll(owner?: User) {
        const rootNode = await this.repo.findOne({ where: { createBy: { id: owner.id }, parent: IsNull() } })
        if (rootNode == null) {
            throw new NotFoundException("can not find location tree")
        }
        return this.database.locations.findDescendantsTree(rootNode, { relations: ["createBy"], })
    }


}