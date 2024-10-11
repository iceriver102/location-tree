import { BaseService } from "~core/base/base.service";
import { DataService } from "~core/database/database.service";
import { Location } from "../location.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateLocationDTO } from "../dtos/create-location.dto";
import { plainToInstance } from "class-transformer";
import { UpdateLocationDto } from "../dtos/update-location.dto";

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
        const loc = plainToInstance(Location, dto, { excludeExtraneousValues: true, exposeUnsetFields: false });
        //user requests to change parent location
        if (dto.parentId != node.parent?.id) {
            if (dto.parentId != null) {
                const parentLoc = await this.findById(dto.parentId);
                if (parentLoc == null) {
                    throw new BadRequestException("the parent location is not found")
                }
                loc.parent = parentLoc;
            } else {
                //update current location to new root location
                loc.parent = null;
            }
        }
        return this.database.locations.update(id, loc)

    }
    
    async create(dto: CreateLocationDTO, parentId?: string): Promise<Location> {
        const loc = plainToInstance(Location, dto, { excludeExtraneousValues: true, exposeUnsetFields: false });

        if (parentId) {
            const parent = await this.repo.findOneBy({ id: parentId });
            if (parent == null) {
                throw new BadRequestException("the parent location is not found")
            }
            loc.parent = parent;
        }
        return this.database.locations.save(loc);
    }

    public async findAll() {
        return this.database.locations.findTrees()
    }

    async findDescendants(id: string): Promise<Location[]> {
        const location = await this.repo.findOneBy({ id });
        if (location == null) {
            throw new BadRequestException("the location not found")
        }
        return this.database.locations.findDescendants(location);
    }

    async findAncestors(id: string): Promise<Location[]> {
        const location = await this.repo.findOneBy({ id });
        if (location == null) {
            throw new BadRequestException("the location not found")
        }
        return this.database.locations.findAncestors(location);
    }
}