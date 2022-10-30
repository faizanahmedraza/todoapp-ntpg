import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { IsMinDate, IsOnlyDateTime, IsUserIdExist } from 'src/validatiors';

@InputType()
export class CreateUserScheduleInput {
  @Field(() => String, { description: 'duration of the user schedule',nullable: true })
  @IsString()
  duration: string;

  @Field(() => String, { description: 'start date of the user schedule' })
  @IsNotEmpty()
  @IsString()
  @IsOnlyDateTime({ message: "Please provide only started date like 2020-12-08 10:00:00" })
  @IsMinDate('endedAt', {
    message: 'Start date must be less than end date',
  })
  startedAt: Date;

  @Field(() => String, { description: 'end date of the user schedule' })
  @IsNotEmpty()
  @IsString()
  @IsOnlyDateTime()
  @IsMinDate('startedAt', {
    message: 'End date must be greater than start date',
  })
  endedAt: Date;

  @Field(() => String, { description: 'description of the user schedule', nullable: true })
  @IsString()
  description: string;

  @Field(() => Int, { description: 'id of the user' })
  @IsNotEmpty()
  @IsInt()
  @IsUserIdExist()
  userId: number;
}
