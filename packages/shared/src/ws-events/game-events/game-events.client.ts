export const ClientGameEvent = {
  PlayerIsReady: "client.game.player_is_ready",
  ChangeStartingPosition:
    "client.game.player_requests_hero_change_starting_position",
  PlayableEntityMoves: "client.game.player_requests_playable_entity_moves",
  PlayableEntityTurnEnds:
    "client.game.player_requests_playable_entity_turn_ends",
} as const;
