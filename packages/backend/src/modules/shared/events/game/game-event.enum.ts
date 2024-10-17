export enum GameEvent {
  GameWon = "game.status.win",
  DoorOpened = "game.update.door_opened",
  MonsterSpawned = "game.update.monster_spawned",
  PlayableEntityAttacked = "game.update.playable_entity_attacked",
  EntityDied = "game.update.playable_entity_died",
  PlayableEntityTookDamage = "game.update.playable_entity_took_damage",
  GameInitializationDone = "game.initialization.done",
  GameUpdated = "game.update.data_updated",
  InitiativesRerolled = "game.update.initiatives_rerolled",
  PlayableEntityMoved = "game.update.playable_entity_moved",
  PlayableEntityTurnEnded = "game.update.playable_entity_turn_ended",
  PlayableEntityTurnStarted = "game.update.playable_entity_turn_started",
  TrapTriggered = "game.update.trap_triggered",
  ChestTrapTriggered = "game.update.chest_trap_triggered",
  PlayableEntityOpenedChest = "game.update.playable_entity_opened_chest",
  PlayableEntityDrankPotion = "game.update.playable_entity_drank_potion",
}
