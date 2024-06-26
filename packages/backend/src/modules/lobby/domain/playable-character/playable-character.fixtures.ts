import { UniqueId } from "src/modules/shared/domain/unique-id";
import { User } from "../user/user.entity";

export const FAKE_HERO_ID = "00000000-0000-0000-0000-000000000020";
export const FAKE_HERO: {
  id: UniqueId;
  type: "hero";
  pickedBy?: User["id"];
} = {
  id: new UniqueId(FAKE_HERO_ID),
  type: "hero",
  pickedBy: undefined,
};

export const FAKE_GAME_MASTER_ID = "00000000-0000-0000-0000-000000000030";
export const FAKE_GAME_MASTER: {
  id: UniqueId;
  type: "game_master";
  pickedBy?: User["id"];
} = {
  id: new UniqueId(FAKE_GAME_MASTER_ID),
  type: "game_master",
  pickedBy: undefined,
};
