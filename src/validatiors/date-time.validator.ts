import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsOnlyDateTime(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsOnlyDateTime',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Please provide only date like 2020-12-08 10:00:00',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
          return typeof value === 'string' && regex.test(value);
        },
      },
    });
  };
}