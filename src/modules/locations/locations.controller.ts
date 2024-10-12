import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { Serialize } from '~core/interceptors/serialize.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { LocationService } from './services/location.service';
import { LocationDTO } from './dtos/location.dto';
import { CreateLocationDTO } from './dtos/create-location.dto';
import { UpdateLocationDto } from './dtos/update-location.dto';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
    constructor(
        private locationService: LocationService,
    ) { }

    @Post("/addNode")
    @Serialize(LocationDTO)
    public async create(@Body() body: CreateLocationDTO) {
        return this.locationService.create(body, body.parentId)
    }

    @Get("/tree")
    @Serialize(LocationDTO)
    public async getTree() {
        return this.locationService.findTrees();
    }

    @Patch("/node/:id")
    public async updateNode(@Param("id") id:string, @Body() body: UpdateLocationDto) {
        return this.locationService.updateNode(id, body);
    }

    @Delete("/node/:id")
    @Serialize(LocationDTO)
    public async deleteNode(@Param("id") id:string) {
        return this.locationService.remove(id);
    }

}
