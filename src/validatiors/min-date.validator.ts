import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { dateBeforeComparison, dateAfterComparison } from '../common/helpers';

export function IsMinDate(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsMinDate",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          let comparison: boolean;
          if (relatedPropertyName.includes("start")) {
            comparison = dateAfterComparison(relatedValue,value)
          } else {
            comparison = dateBeforeComparison(value, relatedValue)
          }
          return typeof value === 'string' && typeof relatedValue === 'string' && comparison;
        },
      },
    });
  };
}