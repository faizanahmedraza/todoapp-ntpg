import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, ValidationOptions } from 'class-validator';
import { UserService } from "./../modules/user/user.service";

@ValidatorConstraint({ name: 'IsUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(private userService: UserService) { }

    async validate(value: string, args: ValidationArguments) {
        try {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = (args.object as any)[relatedPropertyName];
            const whereObj = { email: value };
            let user: any = null;
            let resp = true;
            if (relatedPropertyName != null && relatedPropertyName != undefined && relatedPropertyName.includes("id")) {
                whereObj['id'] = relatedValue;
                user = await this.userService.findByUserNameAndId(whereObj);
                if (user.length > 0) {
                    resp = false;
                }
            } else {
                user = await this.userService.findByUserName(whereObj.email);
                if (user) {
                    resp = false;
                }
            }
            return resp;
        } catch (e) {
            return false;
        }
    }
}


export function IsUserAlreadyExist(validationOptions?: ValidationOptions, property?: string) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsUserAlreadyExistConstraint,
        });
    };
}