import { InteractiveEntity } from '../non-playable/interactive/types/interactive.type';
import { CharacterEntity } from '../playable/character/types/character.type';

export type OnInterationPayload = {
  character: CharacterEntity;
  interactiveEntity: InteractiveEntity;
};
