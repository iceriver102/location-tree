import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { ContextAwareDto } from "~core/base/context-aware";
import { LocationNumberDuplicate } from "../validators/location-number.duplicate";
import { LocationIdExist } from "../validators/location-id.not-exist";
import { LocationParentInvalid } from "../validators/location-parent.loop-tree";

export class UpdateLocationDto extends ContextAwareDto {
    @Expose()
    @IsOptional()
    @IsUUID()
    @ApiProperty({type:"string", required: false, description:"The node's parent if it not set this is root node"})
    @LocationIdExist({message:"Location parent not exist"})
    @LocationParentInvalid()
    parentId?: string;

    @IsOptional()
    @IsString()
    @Expose()
    @ApiProperty({type:"string", required: false, description:"Name of location"})
    name?: string;

    @Expose()
    @IsOptional()
    @IsString()
    @ApiProperty({type:"string", required: false, description:"Level of location"})
    level?: string;

    @Expose()
    @IsOptional()
    @IsString()
    @LocationNumberDuplicate()
    @ApiProperty({type:"string", required: false, description:"Number of location"})
    @MaxLength(10, { message: "Location Building too long" })
    locationNumber?: string;

    @Expose()
    @IsOptional()
    @IsNumber(undefined,{message: "Location area is incorrect" })
    @ApiProperty({type:"number", required: false, description:"Area of location",})
    locationArea?: number;

    @Expose()
    @IsOptional()
    @IsString()
    @MaxLength(4, { message: "Location Building too long" })
    @ApiProperty({type:"string", required: false, description:"Building of location"})
    locationBuilding?: string;
}