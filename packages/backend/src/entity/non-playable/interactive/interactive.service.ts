import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EntityModel } from 'src/entity/model/entity.model';
import { EntityEvent } from 'src/entity/types/events';
import { OnInterationPayload } from 'src/entity/types/on-interaction.event';

@Injectable()
export class InteractiveService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly entityModel: EntityModel,
  ) {}

  @OnEvent(EntityEvent.OnInteration, { async: true })
  public handleInteraction({ character, interactiveEntity }: OnInterationPayload) {
    console.log(`${character.name} triggered an interaction with ${interactiveEntity.name}`);
  }
}
