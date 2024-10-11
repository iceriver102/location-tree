import { Expose, Type } from 'class-transformer';

export class LocationDTO {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    level: string;

    @Expose()
    @Type(() => LocationDTO)
    children: LocationDTO[];

    @Expose()
    @Type(() => LocationDTO)
    parent: LocationDTO;
}
