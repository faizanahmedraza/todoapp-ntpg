import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, ValidationOptions } from 'class-validator';
import { UserScheduleService } from "./../modules/user-schedule/user-schedule.service";

@ValidatorConstraint({ name: 'IsUserScheduleIdExist', async: true })
@Injectable()
export class IsUserScheduleIdExistConstraint implements ValidatorConstraintInterface {
    constructor(private userScheduleService: UserScheduleService) { }

    async validate(value: number, args: ValidationArguments) {
        try {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = (args.object as any)[relatedPropertyName];
            const whereObj = { id: value };
            let user: any = null;
            let resp = true;
            if (relatedPropertyName != null && relatedPropertyName != undefined && relatedPropertyName.includes("userId")) {
                whereObj['userId'] = relatedValue;
                user = await this.userScheduleService.getScheduleByIdUserId(whereObj);
            } else {
                resp = false;
            }
            if (!user) {
                resp = false;
            }
            return resp;
        } catch (e) {
            return false;
        }
    }
}

export function IsUserScheduleIdExist(validationOptions?: ValidationOptions, property?: string) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsUserScheduleIdExistConstraint,
        });
    };
}