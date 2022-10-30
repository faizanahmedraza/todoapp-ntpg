import { CreateUserScheduleInput } from './create-user-schedule.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserScheduleInput extends PartialType(CreateUserScheduleInput) {
  @Field(() => Int, { description: 'id of the user schedule' })
  @IsNotEmpty()
  @IsInt()
  id: number;
}
