import { Module } from "@nestjs/common";
import { LocationService } from "./services/location.service";
import { LocationsController } from "./locations.controller";
import {  LocationIdNotExistRule } from "./validators/location-id.not-exist";
import { LocationNumberDuplicateRule } from "./validators/location-number.duplicate";
import { LocationParentInvalidRule } from "./validators/location-parent.loop-tree";
import { LocationParentRootRule } from "./validators/location-parent.many-root";

@Module({
    controllers: [LocationsController],
    providers: [LocationService,LocationIdNotExistRule,LocationNumberDuplicateRule, LocationParentInvalidRule, LocationParentRootRule],
})
export class LocationModule {

}