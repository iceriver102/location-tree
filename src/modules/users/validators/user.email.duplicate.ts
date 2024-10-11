import { Injectable } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
    ValidationOptions,
} from 'class-validator';
import { DataService } from '~core/database/database.service';

@ValidatorConstraint({ name: 'UserEmailDuplicate', async: true })
@Injectable()
export class UserEmailRule implements ValidatorConstraintInterface {
    constructor(private readonly database: DataService) {
    }

    async validate(email: string) {
        const user = await this.database.users.findOne({ where: { email } });
        return user == null;
    }

    defaultMessage() {
        return 'user\'s email is duplicate';
    }
}

export function UserEmailDuplicate(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'UserEmailDuplicate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: UserEmailRule,
        });
    };
}
