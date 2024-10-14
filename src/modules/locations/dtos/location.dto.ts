import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class LocationDTO {
    @Expose()
    @ApiProperty({description: "The id of node", type:"string"})
    id: string;

    @ApiProperty({description: "The name of node", example:"Telco"})
    @Expose()
    name: string;

    @ApiProperty({description: "The level of node"})
    @Expose()
    level: string;

    @ApiProperty({description: "The location number of node"})
    @Expose()
    locationNumber: string;
    
    @ApiProperty({description: "The location area of node", type: "number"})
    @Expose()
    locationArea: number;

    @ApiProperty({description: "The location building of node"})
    @Expose()
    locationBuilding?: string;


    @ApiProperty({description: "The location children", type: LocationDTO, isArray: true})
    @Expose()
    @Type(() => LocationDTO)
    children?: LocationDTO[];

    @ApiProperty({description: "The location parent",  type: LocationDTO})
    @Expose()
    @Type(() => LocationDTO)
    parent?: LocationDTO;


}
