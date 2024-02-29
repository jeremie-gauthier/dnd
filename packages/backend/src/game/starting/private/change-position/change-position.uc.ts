import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { MessageContext } from 'src/types/socket.type';
import { UseCase } from 'src/types/use-case.interface';
import { ChangePositionInputDto } from './change-position.dto';
import { ChangePositionRepository } from './change-position.repository';

@Injectable()
export class ChangePositionUseCase implements UseCase {
  constructor(private readonly repository: ChangePositionRepository) {}

  public async execute({
    ctx,
    userId,
    changePositionInputDto: { gameId, heroId, requestedPosition },
  }: {
    ctx: MessageContext;
    userId: User['id'];
    changePositionInputDto: ChangePositionInputDto;
  }): Promise<void> {
    // TODO gateway:
    // 1. add userId param
    // 2. setup the right OnMessage

    // TODO use case:
    // 1. get game by id
    // 2. ensure userId is in this game and own that hero
    // 3. ensure the requested position is a free (a) starting tile (b)  (=> no entity blocking this tile, create a util fn for this)
    // 4. move the hero to that position (update the map and the hero's coord)
    // 5. send ws message to notify this update to everyone in the lobby

    throw new Error('Not implemented');
  }
}
