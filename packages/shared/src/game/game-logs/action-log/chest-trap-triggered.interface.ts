import { PlayableEntity } from "../../../database";
import { ActionLog } from "./action-log.interface";

export interface ChestTrapTriggeredLog extends ActionLog {
  type: "game.update.chest_trap_triggered";
  data: {
    chestTrapName:
      | "dazzling_light_1"
      | "call_from_the_grave_1"
      | "brutal_betrayal_1"
      | "blanket_of_flames_1"
      | "magic_loss_1"
      | "smothering_mist_1"
      | "voices_of_the_damned_1";
    subjectEntityName: PlayableEntity["name"];
  };
}
