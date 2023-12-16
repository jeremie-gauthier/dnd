import { CharacterEntity } from 'src/database/models/entity-template/types/character.type';
import { MapTemplate } from 'src/database/models/map-template/map-template.type';

export type OnGameCreationPayload = {
  characters: Array<CharacterEntity>;
  map: MapTemplate;
};
