import { InteractiveEntity } from '../non-playable/interactive/types/interactive.type';
import { NonInteractiveEntity } from '../non-playable/non-interactive/types/non-interactive.type';
import { CharacterEntity } from '../playable/character/types/character.type';
import { EnemyEntity } from '../playable/enemy/types/enemy.type';

export type Entity = CharacterEntity | EnemyEntity | NonInteractiveEntity | InteractiveEntity;
