import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from "class-validator";
import { IsUserIdExist } from 'src/validatiors';

@InputType()
export class RemoveUserScheduleInput {
    @Field(() => Int, { description: 'id of the user schedule' })
    @IsNotEmpty()
    @IsInt()
    id: number;
    
    @Field(() => Int, { description: 'id of the user' })
    @IsNotEmpty()
    @IsInt()
    @IsUserIdExist()
    userId: number;
}