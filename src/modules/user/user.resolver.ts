import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserScheduleService } from './../user-schedule/user-schedule.service';
import { TodoService } from '../todo/todo.service';
import { UserSchedule } from '../user-schedule/entities/user-schedule.entity';
import { Todo } from '../todo/entities/todo.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userScheduleService: UserScheduleService,
    private readonly todosService: TodoService
  ) { }

  @Mutation(() => String)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => String)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => String)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @ResolveField('userSchedules', returns => [UserSchedule])
  async getUserSchedules(@Parent() user: User) {
    const { id } = user;
    return this.userScheduleService.getUserSchedules(id);
  }

  @ResolveField('todoTasks', returns => [Todo])
  async getTodoTasks(@Parent() user: User) {
    const { id } = user;
    return this.todosService.getTodosByUser(id);
  }
}
