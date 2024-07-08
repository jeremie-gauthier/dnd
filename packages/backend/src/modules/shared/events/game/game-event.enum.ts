export enum GameEvent {
  DoorOpened = "game.update.door_opened",
  MonstersSpawned = "game.update.monsters_spawned",
  EntityAttacked = "game.update.playable_entity_attacked",
  EntityDied = "game.update.playable_entity_died",
  EntityTookDamage = "game.update.playable_entity_took_damage",
  GameInitializationDone = "game.initialization.done",
  GameUpdated = "game.update.data_updated",
  InitiativesRerolled = "game.update.initiatives_rerolled",
  PlayableEntityMoved = "game.update.playable_entity_moved",
  PlayableEntityTurnEnded = "game.update.playable_entity_turn_ended",
  PlayableEntityTurnStarted = "game.update.playable_entity_turn_started",
  TrapTriggered = "game.update.trap_triggered",
}
