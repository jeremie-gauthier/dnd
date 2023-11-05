import type { Door } from '../../entities/non-playables/interactives/door.entity';
import type { Character } from '../../entities/playables/characters/character.abstract';
import type { Enemy } from '../../entities/playables/enemies/enemy.abstract';
import type { Item } from '../../items/item.abstract';

// ! unused
export interface GameCondition {
  name: string;
  data: any;
}

export type WinCondition =
  | KillAllEnemies
  | KillAllBosses
  | LootQuestItems
  | UnlockDoors;

export interface KillAllEnemies {
  name: 'killAllEnemies';
  data: {
    enemies: Enemy[];
  };
}

export interface KillAllBosses {
  name: 'killAllBosses';
  data: {
    bosses: Enemy[];
  };
}

export interface LootQuestItems {
  name: 'lootQuestItems';
  data: {
    items: Item[];
  };
}

export interface UnlockDoors {
  name: 'unlockDoors';
  data: {
    doors: Door[];
  };
}

export type LooseCondition = AllCharactersAreDead;

export interface AllCharactersAreDead {
  name: 'allCharactersAreDead';
  data: {
    characters: Character[];
  };
}
