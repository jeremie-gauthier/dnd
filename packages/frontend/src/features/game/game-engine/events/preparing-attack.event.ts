import {
  AttackResponseDto,
  GameResponseDto,
  SpellResponseDto,
  WeaponResponseDto,
} from "@/openapi/dnd-api";
import { PlayableEntity } from "@features/game/interfaces/dnd-api/playable-entity.interface";

export class PreparingAttackEvent extends Event {
  public static readonly EventName = "PreparingAttack";

  constructor(
    public readonly game: GameResponseDto,
    public readonly entityPlaying: PlayableEntity,
    public readonly item: WeaponResponseDto | SpellResponseDto,
    public readonly attack: AttackResponseDto,
  ) {
    super(PreparingAttackEvent.EventName);
  }
}
