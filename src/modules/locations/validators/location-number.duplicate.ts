import { Injectable } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
    ValidationOptions,
} from 'class-validator';
import { DataService } from '~core/database/database.service';

@ValidatorConstraint({ name: 'LocationNumberDuplicate', async: true })
@Injectable()
export class LocationNumberDuplicateRule implements ValidatorConstraintInterface {
    constructor(private readonly dataServices: DataService) { }

    async validate(locationNumber: string) {
        const node = await this.dataServices.locations.findOne({
            where: { locationNumber }
        });
        return node == null;
    }

    defaultMessage() {
        return 'Location number is duplicate';
    }
}

export function LocationNumberDuplicate(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'LocationNumberDuplicate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: LocationNumberDuplicateRule,
        });
    };
}
