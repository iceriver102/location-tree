import { Module } from "@nestjs/common";
import { LocationService } from "./services/location.service";
import { LocationsController } from "./locations.controller";
import {  LocationIdNotExistRule } from "./validators/location-id.not-exist";
import { LocationNumberDuplicateRule } from "./validators/location-number.duplicate";

@Module({
    controllers: [LocationsController],
    providers: [LocationService,LocationIdNotExistRule,LocationNumberDuplicateRule],
})
export class LocationModule {

}