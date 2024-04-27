export enum GameEvent {
  TrapTriggered = "game.update.trap_triggered",
  EntityTookDamage = "game.update.playable_entity_took_damage",
  EntityDied = "game.update.playable_entity_died",
  DoorOpened = "game.update.door_opened",
  GameInitializationStarted = "game.initialization.started",
  GameInitializationDone = "game.initialization.done",
  PlayableEntityMoved = "game.update.playable_entity_moved",
  PlayableEntityTurnEnded = "game.update.playable_entity_turn_ended",
}
