import {
  GameEntity,
  PlayableEntity,
  TileNonPlayableInteractiveEntity,
} from "@dnd/shared";

export type TrapTrigger = (payload: {
  game: GameEntity;
  trapEntity: TileNonPlayableInteractiveEntity;
  subjectEntity: PlayableEntity;
}) => void;
