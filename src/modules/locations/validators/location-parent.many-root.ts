import { Injectable } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';
import { DataService } from '~core/database/database.service';
import { UpdateLocationDto } from '../dtos/update-location.dto';
import { IsNull } from 'typeorm';

@ValidatorConstraint({ name: 'LocationParentRoot', async: true })
@Injectable()
export class LocationParentRootRule implements ValidatorConstraintInterface {
    constructor(private readonly dataServices: DataService) { }

    async validate(parentId: string) {
        if (parentId != null) {
            return true;
        }

        const countRoot = await this.dataServices.locations.count({ where: { parent: { id: IsNull() } } });
        return countRoot == 0;
    }

    defaultMessage() {
        return 'Can not create many tree';
    }
}

export function LocationParentRoot(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'LocationParentRoot',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: LocationParentRootRule,
        });
    };
}
