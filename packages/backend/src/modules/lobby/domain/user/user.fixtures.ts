import { UniqueId } from "src/modules/shared/domain/unique-id";
import { UserStatus } from "../user-status/user-status.vo";

export const FAKE_USER_ID = "00000000-0000-0000-0000-000000000002";

export const FAKE_USER: {
  userId: UniqueId;
  status: UserStatus;
  role: "game_master" | "player" | "none";
} = {
  status: new UserStatus(false),
  role: "none",
  userId: new UniqueId(FAKE_USER_ID),
};
