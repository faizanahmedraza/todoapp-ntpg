import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { RemoveTodoInput } from './dto/remove-todo.input';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) { }

  async create(createTodoInput: CreateTodoInput): Promise<String> {
    try {
      const todo = this.todoRepository.create({
        title: createTodoInput?.title,
        description: createTodoInput?.description,
        userSchedule: {
          id: createTodoInput?.userScheduleId
        },
        user: {
          id: createTodoInput?.userId
        }
      });
      this.todoRepository.save(todo);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
    return "todo task has been created";
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find({
      relations: {
        user: true,
        userSchedule: true
      }
    });
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id }, relations: { user: true, userSchedule: true } });
    if (!todo) {
      throw new BadRequestException(`Todo #${id} not found`);
    }
    return todo;
  }

  async update(
    id: number,
    input: UpdateTodoInput,
  ): Promise<String> {
    const Todo = await this.findOne(id);
    try {
      await this.todoRepository.update({
        id: Todo.id
      }, {
        title: input?.title,
        description: input?.description,
        userSchedule: {
          id: input?.userScheduleId
        },
        user: {
          id: input?.userId
        }
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
    return "todo task has been updated";
  }

  async remove(input: RemoveTodoInput) {
    const todo = await this.todoRepository.findOneBy({
      id: input.id,
      user: {
        id: input.userId
      },
      userSchedule: {
        id: input.userScheduleId
      }
    });
    if (!todo) {
      throw new BadRequestException(`You don't have permission to delete that todo.`);
    }
    await this.todoRepository.delete(todo.id);
    return "todo task has been deleted";
  }

  async getTodosBySchedule(scheduleId: number) {
    return await this.todoRepository.findBy({ userSchedule: { id: scheduleId } });
  }

  async getTodosByUser(userId: number) {
    return await this.todoRepository.findBy({ user: { id: userId } });
  }
}
