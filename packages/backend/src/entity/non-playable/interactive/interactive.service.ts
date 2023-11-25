import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EntityTemplateModel } from 'src/entity/model/entity-template.model';
import { EntityEvent } from 'src/entity/types/events';
import { OnInterationPayload } from 'src/entity/types/on-interaction.event';

@Injectable()
export class InteractiveService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly entityModel: EntityTemplateModel,
  ) {}

  @OnEvent(EntityEvent.OnInteration, { async: true })
  public handleInteraction({ character, interactiveEntity }: OnInterationPayload) {
    console.log(`${character.name} triggered an interaction with ${interactiveEntity.name}`);
  }
}
