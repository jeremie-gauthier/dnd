import { CharacterEntity } from 'src/entity/playable/character/types/character.type';
import { Map } from 'src/map/types/map.type';

export type OnGameCreationPayload = {
  characters: Array<CharacterEntity>;
  map: Map;
};
