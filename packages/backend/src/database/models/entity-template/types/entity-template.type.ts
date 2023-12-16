import { CharacterEntity } from './character.type';
import { EnemyEntity } from './enemy.type';
import { InteractiveEntity } from './interactive.type';
import { NonInteractiveEntity } from './non-interactive.type';

export type Entity = CharacterEntity | EnemyEntity | NonInteractiveEntity | InteractiveEntity;
