import { User } from "../user/user.entity";

export const FAKE_HERO_ID = "00000000-0000-0000-0000-000000000020";
export const getFakeHero = (): {
  id: string;
  type: "hero";
  pickedBy?: User["id"];
} => {
  return {
    id: FAKE_HERO_ID,
    type: "hero",
    pickedBy: undefined,
  };
};

export const FAKE_GAME_MASTER_ID = "00000000-0000-0000-0000-000000000030";
export const getFakeGameMaster = (): {
  id: string;
  type: "game_master";
  pickedBy?: User["id"];
} => {
  return {
    id: FAKE_GAME_MASTER_ID,
    type: "game_master",
    pickedBy: undefined,
  };
};
