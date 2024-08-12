import { UserStatus } from "../user-status/user-status.vo";

export const FAKE_USER_ID = "00000000-0000-0000-0000-000000000002";

export const getFakeUserData = (): {
  userId: string;
  status: UserStatus;
} => {
  return {
    status: new UserStatus(false),
    userId: FAKE_USER_ID,
  };
};
