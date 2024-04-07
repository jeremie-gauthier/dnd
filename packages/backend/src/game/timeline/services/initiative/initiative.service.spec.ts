import { Test, TestingModule } from '@nestjs/testing';
import { InitiativeService } from './initiative.service';

describe('InitiativeService', () => {
  let service: InitiativeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InitiativeService],
    }).compile();

    service = module.get<InitiativeService>(InitiativeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
