import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString,IsNotEmpty, MaxLength, IsInt } from 'class-validator';
import { IsUserIdExist, IsUserScheduleIdExist } from 'src/validatiors';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'title of the user' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  title: string;

  @Field(() => String, { description: 'description of the user' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => Int, { description: 'id of the user' })
  @IsNotEmpty()
  @IsInt()
  @IsUserIdExist()
  userId: number;

  @Field(() => Int, { description: 'id of the user schedule' })
  @IsNotEmpty()
  @IsInt()
  @IsUserScheduleIdExist({ message: "Invalid user schedule id." }, 'userId')
  userScheduleId: number;
}
