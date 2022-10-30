import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserScheduleInput } from './dto/create-user-schedule.input';
import { UpdateUserScheduleInput } from './dto/update-user-schedule.input';
import { Repository } from 'typeorm';
import { UserSchedule } from './entities/user-schedule.entity';
import { RemoveUserScheduleInput } from './dto/remove-user-schedule.input';

@Injectable()
export class UserScheduleService {
  constructor(
    @InjectRepository(UserSchedule)
    private userScheduleRepository: Repository<UserSchedule>,
  ) { }

  async create(createUserScheduleInput: CreateUserScheduleInput): Promise<String> {
    try {
      const user = this.userScheduleRepository.create({
        startedAt: createUserScheduleInput?.startedAt,
        endedAt: createUserScheduleInput?.endedAt,
        description: createUserScheduleInput?.description,
        user: {
          id: createUserScheduleInput?.userId
        }
      });
      await this.userScheduleRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return "user schedule has been created."
  }

  async findAll(): Promise<UserSchedule[]> {
    return this.userScheduleRepository.find({
      relations: {
        user: true
      }
    });
  }

  async findOne(id: number): Promise<UserSchedule> {
    const user = await this.userScheduleRepository.findOne({ where: { id }, relations: { user: true } });
    if (!user) {
      throw new BadRequestException(`User schedule #${id} not found`);
    }
    return user;
  }

  async update(
    id: number,
    input: UpdateUserScheduleInput,
  ): Promise<String> {
    const user = await this.findOne(id);
    try {
      await this.userScheduleRepository.update({
        id: user.id
      }, {
        startedAt: input?.startedAt,
        endedAt: input?.endedAt,
        description: input?.description,
        user: {
          id: input?.userId
        }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return "user schedule has been updated.";
  }

  async remove(input: RemoveUserScheduleInput) {
    const schedule = await this.userScheduleRepository.findOneBy({
      id: input.id,
      user: {
        id: input.userId
      }
    });
    if (!schedule) {
      throw new BadRequestException(`You don't have permission to delete that user schedule.`);
    }
    await this.userScheduleRepository.delete(schedule.id);
    return "user schedule has been deleted";
  }

  async getUserSchedules(userId: number) {
    return await this.userScheduleRepository.findBy({ user: { id: userId } });
  }

  async getScheduleByIdUserId(params: any) {
    return await this.userScheduleRepository.findOneBy({
      user: {
        id: params.userId
      },
      id: params.id
    });
  }
}
