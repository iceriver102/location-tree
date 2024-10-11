import { Module } from "@nestjs/common";
import { LocationService } from "./services/location.service";
import { LocationsController } from "./locations.controller";

@Module({
    controllers: [LocationsController],
    providers: [LocationService],
})
export class LocationModule {

}