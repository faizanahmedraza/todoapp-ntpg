import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserScheduleModule } from './../user-schedule/user-schedule.module';
import { TodoModule } from './../todo/todo.module';
import { IsUserAlreadyExistConstraint } from './../../validatiors/email-exists.validator';
import { IsUserIdExistConstraint } from './../../validatiors/user-id-exists.validator';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserScheduleModule,
    TodoModule
  ],
  providers: [
    UserResolver,
    UserService,
    IsUserAlreadyExistConstraint,
    IsUserIdExistConstraint
  ],
  exports: [UserService]
})
export class UserModule { }
