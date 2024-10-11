import {
    Body,
    Controller,
    Post,
    Get,
    UseGuards,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { Serialize } from '~core/interceptors/serialize.interceptor';
import { CurrentUser } from '~core/decorators/current-user.decorator';
import { AuthGuard } from '~core/guards/auth.guard';
import { Public } from '~core/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocationService } from './services/location.service';
import { LocationDTO } from './dtos/location.dto';
import { CreateLocationDTO } from './dtos/create-location.dto';
import { UpdateLocationDto } from './dtos/update-location.dto';

@ApiTags('Locations')
@Controller('locations')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class LocationsController {
    constructor(
        private locationService: LocationService,
    ) { }
    @Post("/")
    @Serialize(LocationDTO)
    public async create(@Body() body: CreateLocationDTO) {
        return this.locationService.create(body, body.parentId)
    }

    @Get("/")
    @Public()
    @Serialize(LocationDTO)
    public async getTree() {
        return this.locationService.findAll();
    }

    @Patch("/:id")
    public async updateNode(@Param("id") id:string,@Body() body:UpdateLocationDto) {
        return this.locationService.updateNode(id, body);
    }


    @Delete("/:id")
    public async deleteNode(@Param("id") id:string) {
        return this.locationService.remove(id);
    }

}
