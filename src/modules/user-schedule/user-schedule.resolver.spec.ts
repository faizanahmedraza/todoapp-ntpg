import { Test, TestingModule } from '@nestjs/testing';
import { UserScheduleResolver } from './user-schedule.resolver';
import { UserScheduleService } from './user-schedule.service';

describe('UserScheduleResolver', () => {
  let resolver: UserScheduleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserScheduleResolver, UserScheduleService],
    }).compile();

    resolver = module.get<UserScheduleResolver>(UserScheduleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
