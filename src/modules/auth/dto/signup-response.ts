import { Field, ObjectType, PartialType } from "@nestjs/graphql";
import { User } from "src/modules/user/entities/user.entity";
import { LoginResponse } from "./login-response";

@ObjectType()
export class SignUpResponse extends PartialType(LoginResponse) {}