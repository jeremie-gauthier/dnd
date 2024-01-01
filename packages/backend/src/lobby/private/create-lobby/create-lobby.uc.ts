import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/types/use-case.interface';
import { CreateLobbyRepository } from './create-lobby.repository';

@Injectable()
export class CreateLobbyUseCase implements UseCase {
  constructor(private readonly repository: CreateLobbyRepository) {}

  public async execute(): Promise<void> {
    throw new Error('Not implemented');
  }
}
