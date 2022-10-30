import { Module } from '@nestjs/common';
import { UserScheduleService } from './user-schedule.service';
import { UserScheduleResolver } from './user-schedule.resolver';
import { DateScalar } from '../../common/scalars/gql-date.scalar';
import { IsUserScheduleIdExistConstraint } from 'src/validatiors';
import { UserSchedule } from './entities/user-schedule.entity';
import { TodoModule } from '../todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchedule]),
    TodoModule
  ],
  providers: [
    UserScheduleResolver,
    UserScheduleService,
    IsUserScheduleIdExistConstraint,
    DateScalar
  ],
  exports: [UserScheduleService]
})
export class UserScheduleModule { }
