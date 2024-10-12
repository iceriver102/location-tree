import { Injectable } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
    ValidationOptions,
} from 'class-validator';
import { DataService } from '~core/database/database.service';

@ValidatorConstraint({ name: 'LocationIdNotExist', async: true })
@Injectable()
export class LocationIdNotExistRule implements ValidatorConstraintInterface {
    constructor(private readonly dataServices: DataService) { }

    async validate(id?: string) {
        if(id == null){
            return true;
        }
        const node = await this.dataServices.locations.findOne({
            where: { id }
        });
        return node != null;
    }

    defaultMessage() {
        return 'Location id is not exist';
    }
}

export function LocationIdExist(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'LocationIdExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: LocationIdNotExistRule,
        });
    };
}
