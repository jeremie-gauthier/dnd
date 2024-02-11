import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { MapSerializerService } from './map-serializer.service';

describe('MapSerializerService', () => {
  let service: MapSerializerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapSerializerService],
    }).compile();

    service = module.get<MapSerializerService>(MapSerializerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
