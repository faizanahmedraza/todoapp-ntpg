import { Test, TestingModule } from '@nestjs/testing';
import { UserScheduleService } from './user-schedule.service';

describe('UserScheduleService', () => {
  let service: UserScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserScheduleService],
    }).compile();

    service = module.get<UserScheduleService>(UserScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
