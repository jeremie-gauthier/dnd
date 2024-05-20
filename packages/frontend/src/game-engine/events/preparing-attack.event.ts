import { GameEntity, GameItem, PlayableEntity } from "@dnd/shared";

export class PreparingAttackEvent extends Event {
  public static readonly EventName = "PreparingAttack";

  constructor(
    public readonly game: GameEntity,
    public readonly heroPlaying: PlayableEntity,
    public readonly item: GameItem,
    public readonly attack: GameItem["attacks"][number],
  ) {
    super(PreparingAttackEvent.EventName);
  }
}
