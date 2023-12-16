import { CharacterEntity } from 'src/database/models/entity-template/types/character.type';
import { InteractiveEntity } from 'src/database/models/entity-template/types/interactive.type';

export type OnInterationPayload = {
  character: CharacterEntity;
  interactiveEntity: InteractiveEntity;
};
