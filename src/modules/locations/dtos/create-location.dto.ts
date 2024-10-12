import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateLocationDTO {
    @Expose()
    @IsOptional()
    @IsString()
    @ApiProperty({type:"string", required: false, description:"The node's parent if it not set this is root node"})
    parentId?: string;

    @IsString()
    @Expose()
    @ApiProperty({type:"string", required: true, description:"Name of location"})
    name: string;

    @Expose()
    @IsString()
    @ApiProperty({type:"string", required: true, description:"Level of location"})
    level: string;

    @Expose()
    @IsString()
    @ApiProperty({type:"string", required: true, description:"Number of location"})
    @MaxLength(10, { message: "Location Building too long" })
    locationNumber: string;

    @Expose()
    @IsNumber(undefined,{message: "Location area is incorrect" })
    @ApiProperty({type:"number", required: true, description:"Area of location",})
    locationArea: number;

    @Expose()
    @IsOptional()
    @IsString()
    @MaxLength(4, { message: "Location Building too long" })
    @ApiProperty({type:"string", required: false, description:"Building of location"})
    locationBuilding?: string;

}