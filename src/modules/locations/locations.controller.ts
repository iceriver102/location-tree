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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocationService } from './services/location.service';
import { LocationDTO } from './dtos/location.dto';
import { CreateLocationDTO } from './dtos/create-location.dto';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { User } from '~modules/users/user.entity';

@ApiTags('Locations')
@Controller('locations')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class LocationsController {
    constructor(
        private locationService: LocationService,
    ) { }
    @Post("/addNode")
    @Serialize(LocationDTO)
    public async create(@Body() body: CreateLocationDTO, @CurrentUser() user: User) {
        return this.locationService.create(body, user, body.parentId)
    }

    @Get("/tree")
    @Serialize(LocationDTO)
    public async getTree(@CurrentUser() user: User) {
        return this.locationService.findAll(user);
    }

    @Patch("/node/:id")
    public async updateNode(@Param("id") id:string, @Body() body:UpdateLocationDto, @CurrentUser() user: User) {
        return this.locationService.updateNode(id, body, user);
    }


    @Delete("/node/:id")
    @Serialize(LocationDTO)
    public async deleteNode(@Param("id") id:string) {
        return this.locationService.remove(id);
    }

}
