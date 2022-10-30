import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt,IsNotEmpty } from "class-validator";
import { IsUserIdExist, IsUserScheduleIdExist } from 'src/validatiors';

@InputType()
export class RemoveTodoInput {
    @Field(() => Int, { description: 'id of the todo task' })
    @IsNotEmpty()
    @IsInt()
    id: number;

    @Field(() => Int, { description: 'id of the user' })
    @IsNotEmpty()
    @IsInt()
    @IsUserIdExist()
    userId: number;

    @Field(() => Int, { description: 'id of the user schedule' })
    @IsNotEmpty()
    @IsInt()
    @IsUserScheduleIdExist({message: "Invalid user schedule id."},'userId')
    userScheduleId: number;
}