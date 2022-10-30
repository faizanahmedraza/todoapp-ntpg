import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail, MaxLength, MinLength } from "class-validator";
import { IsUserAlreadyExist } from './../../../validatiors';
import { i18nValidationMessage } from 'nestjs-i18n';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @Field()
  @IsString()
  @MaxLength(100)
  @IsEmail()
  @IsUserAlreadyExist({ message: i18nValidationMessage('validation.ALREADY_EXISTS') })
  email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  address: string;
}
