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
import { Equal, FindOptionsWhere, Not } from 'typeorm';
import { Location } from '../location.entity';

@ValidatorConstraint({ name: 'LocationParentInvalid', async: true })
@Injectable()
export class LocationParentInvalidRule implements ValidatorConstraintInterface {
    constructor(private readonly dataServices: DataService) { }

    async validate(parentId: string, validationArguments: ValidationArguments) {
        const body: UpdateLocationDto = validationArguments.object;
        
        if(body.context?.params?.id && parentId != null){
            const node = await this.dataServices.locations.findOne({where:{id: body.context.params.id}});
            const branch = await this.dataServices.locations.findDescendants(node);
            const invalidFlag = branch.some(ele=>ele.id == parentId);
            return !invalidFlag;
        }
        
        return true;
    }

    defaultMessage() {
        return 'Location parent is looping';
    }
}

export function LocationParentInvalid(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'LocationParentInvalid',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: LocationParentInvalidRule,
        });
    };
}
