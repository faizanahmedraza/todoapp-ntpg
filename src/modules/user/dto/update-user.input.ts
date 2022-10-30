import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType,Int } from '@nestjs/graphql';
import { IsInt } from "class-validator";
import { IsUserAlreadyExist } from './../../../validatiors/email-exists.validator';
import { i18nValidationMessage } from 'nestjs-i18n';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int, { description: 'id of the user' })
  @IsInt()
  id: number;

  @IsUserAlreadyExist({message: i18nValidationMessage('validation.ALREADY_EXISTS')},'id')
  email: string;
}
