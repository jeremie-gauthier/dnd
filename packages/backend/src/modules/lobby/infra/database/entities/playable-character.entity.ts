export class PlayableCharacter {
  readonly id: string;
  readonly type: "game_master" | "hero";
  pickedBy?: string;
}
