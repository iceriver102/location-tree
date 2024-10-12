import { Expose, Type } from 'class-transformer';
import { User } from '~modules/users/user.entity';

export class LocationDTO {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    level: string;

    @Expose()
    locationNumber: string;
    
    @Expose()
    locationArea: number;

    @Expose()
    locationBuilding?: string;

    @Expose()
    @Type(() => LocationDTO)
    children: LocationDTO[];

    @Expose()
    @Type(() => LocationDTO)
    parent: LocationDTO;


    @Expose()
    @Type(() => User)
    createBy?: User;
}
