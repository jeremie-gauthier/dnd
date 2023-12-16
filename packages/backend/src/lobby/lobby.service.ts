import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GameEvent } from 'src/game/events/types/events';

@Injectable()
export class LobbyService {
  constructor(private eventEmitter: EventEmitter2) {}

  public async handleGameCreation() {
    this.eventEmitter.emit(GameEvent.OnGameCreation, {
      character: { name: 'Robert' },
      interactiveEntity: { name: 'Porte' },
    });
  }
}
