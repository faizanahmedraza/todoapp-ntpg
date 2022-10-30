import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, ValidationOptions } from 'class-validator';
import { UserService } from "./../modules/user/user.service";

@ValidatorConstraint({ name: 'IsUserIdExist', async: true })
@Injectable()
export class IsUserIdExistConstraint implements ValidatorConstraintInterface {
    constructor(private userService: UserService) { }

    async validate(value: number, args: ValidationArguments) {
        try {
            return this.userService.findOne(value).then(user => {
                if (user) return true;
                return false;
              });
        } catch (e) {
            return false;
        }
    }
}

export function IsUserIdExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserIdExistConstraint,
        });
    };
}