import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/types/use-case.interface';
import { PickHeroRepository } from './pick-hero.repository';

@Injectable()
export class PickHeroUseCase implements UseCase {
  constructor(private readonly repository: PickHeroRepository) {}

  public async execute(): Promise<void> {
    throw new Error('Not implemented');
  }
}
