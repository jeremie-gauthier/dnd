import {
  AllCharactersAreDead,
  KillAllBosses,
  KillAllEnemies,
  LooseCondition,
  LootQuestItems,
  UnlockDoors,
  WinCondition,
} from './objectives.type';

type ConditionTestersMap<Conditions extends LooseCondition | WinCondition> = {
  [Condition in Conditions as Condition['name']]: (
    data: Condition['data'],
  ) => boolean;
};

// type ConditionTester<Condition extends { data: any }> = (
//   data: Condition['data'],
// ) => () => boolean;

export class Objective {
  private static WinConditionTesters: ConditionTestersMap<WinCondition> = {
    killAllEnemies: Objective.killAllEnemies.bind(this),
    killAllBosses: Objective.killAllBosses.bind(this),
    lootQuestItems: Objective.lootQuestItems.bind(this),
    unlockDoors: Objective.unlockDoors.bind(this),
  };
  private static LooseConditionTesters: ConditionTestersMap<LooseCondition> = {
    allCharactersAreDead: Objective.allCharactersAreDead.bind(this),
  };

  private readonly winConditionTester;
  private readonly looseConditionTester;

  constructor(
    public readonly winCondition: WinCondition,
    public readonly looseCondition: LooseCondition,
  ) {
    this.winConditionTester = Objective.WinConditionTesters[winCondition.name];
    this.looseConditionTester =
      Objective.LooseConditionTesters[looseCondition.name];
  }

  public testWinCondition(): boolean {
    // @ts-expect-error this is well mapped in constructor
    return this.winConditionTester(this.winCondition.data);
  }

  public testLooseCondition(): boolean {
    return this.looseConditionTester(this.looseCondition.data);
  }

  private static allCharactersAreDead({
    characters,
  }: AllCharactersAreDead['data']) {
    return characters.every((character) => !character.isAlive);
  }

  private static killAllEnemies({ enemies }: KillAllEnemies['data']) {
    return enemies.every((enemy) => !enemy.isAlive);
  }

  private static killAllBosses({ bosses }: KillAllBosses['data']) {
    return bosses.every((boss) => !boss.isAlive);
  }

  private static lootQuestItems({ items }: LootQuestItems['data']) {
    return false;
  }

  private static unlockDoors({ doors }: UnlockDoors['data']) {
    return false;
  }
}
