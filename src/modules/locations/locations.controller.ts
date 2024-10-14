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
import {  ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    @ApiOperation({ summary: 'Create a node of location tree', description: "The api create a node of location tree if the parent id is null the node is root" })
    @ApiResponse({ type: LocationDTO })
    @Serialize(LocationDTO)
    public async create(@Body() body: CreateLocationDTO) {
        return this.locationService.create(body, body.parentId)
    }

    @Get("/tree")
    @ApiOperation({ summary: 'View location tree' })
    @ApiResponse({ type: LocationDTO })
    @Serialize(LocationDTO)
    public async getTree() {
        return this.locationService.findTrees();
    }

    @Patch("/node/:id")
    @ApiOperation({ summary: 'Update information a node of location tree' })
    @ApiParam({ name: "id", description: "The id of node" })
    public async updateNode(@Param("id") id: string, @Body() body: UpdateLocationDto) {
        return this.locationService.updateNode(id, body);
    }

    @Delete("/node/:id")
    @ApiResponse({ type: LocationDTO })
    @ApiParam({ name: "id", description: "The id of node" })
    @ApiOperation({ summary: 'Delete a node and subtree of location tree' })
    @Serialize(LocationDTO)
    public async deleteNode(@Param("id") id: string) {
        return this.locationService.remove(id);
    }

}
