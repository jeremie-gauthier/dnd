import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class LobbyService {
  constructor(private eventEmitter: EventEmitter2) {}
}
