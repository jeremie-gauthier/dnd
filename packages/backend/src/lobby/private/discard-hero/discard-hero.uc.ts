import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/types/use-case.interface';
import { DiscardHeroRepository } from './discard-hero.repository';

@Injectable()
export class DiscardHeroUseCase implements UseCase {
  constructor(private readonly repository: DiscardHeroRepository) {}

  public async execute(): Promise<void> {
    throw new Error('Not implemented');
  }
}
