import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UserScheduleService } from './user-schedule.service';
import { UserSchedule } from './entities/user-schedule.entity';
import { CreateUserScheduleInput } from './dto/create-user-schedule.input';
import { UpdateUserScheduleInput } from './dto/update-user-schedule.input';
import { Todo } from '../todo/entities/todo.entity';
import { TodoService } from '../todo/todo.service';
import { RemoveUserScheduleInput } from './dto/remove-user-schedule.input';

@Resolver(() => UserSchedule)
export class UserScheduleResolver {
  constructor(
    private readonly userScheduleService: UserScheduleService,
    private readonly todosService: TodoService
    ) {}

  @Mutation(() => String)
  createUserSchedule(@Args('createUserScheduleInput') createUserScheduleInput: CreateUserScheduleInput) {
    return this.userScheduleService.create(createUserScheduleInput);
  }

  @Query(() => [UserSchedule], { name: 'userSchedule' })
  findAll() {
    return this.userScheduleService.findAll();
  }

  @Query(() => UserSchedule, { name: 'userSchedule' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userScheduleService.findOne(id);
  }

  @Mutation(() => String)
  updateUserSchedule(@Args('updateUserScheduleInput') updateUserScheduleInput: UpdateUserScheduleInput) {
    return this.userScheduleService.update(updateUserScheduleInput.id, updateUserScheduleInput);
  }

  @Mutation(() => String)
  removeUserSchedule(@Args('removeSchedule') removeSchedule: RemoveUserScheduleInput) {
    return this.userScheduleService.remove(removeSchedule);
  }

  @ResolveField('todoTasks', returns => [Todo])
  async getTodoTasks(@Parent() userSchedule: UserSchedule) {
    const { id } = userSchedule;
    return this.todosService.getTodosBySchedule(id);
  }
}
