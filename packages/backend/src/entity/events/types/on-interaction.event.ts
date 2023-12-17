import { CharacterEntity } from 'src/database/entities/entity-template/types/character.type';
import { InteractiveEntity } from 'src/database/entities/entity-template/types/interactive.type';

export type OnInterationPayload = {
  character: CharacterEntity;
  interactiveEntity: InteractiveEntity;
};
