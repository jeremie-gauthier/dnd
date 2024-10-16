import { GameItem, GameView, PlayableEntity } from "@dnd/shared";

export class PreparingAttackEvent extends Event {
  public static readonly EventName = "PreparingAttack";

  constructor(
    public readonly game: GameView,
    public readonly entityPlaying: PlayableEntity,
    public readonly item: GameItem,
    public readonly attack: Extract<
      GameItem,
      { type: "Weapon" | "Spell" }
    >["attacks"][number],
  ) {
    super(PreparingAttackEvent.EventName);
  }
}
