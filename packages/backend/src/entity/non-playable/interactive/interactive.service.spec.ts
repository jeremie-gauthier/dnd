import { Test, TestingModule } from '@nestjs/testing';
import { InteractiveService } from './interactive.service';

describe('InteractiveService', () => {
  let service: InteractiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InteractiveService],
    }).compile();

    service = module.get<InteractiveService>(InteractiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
