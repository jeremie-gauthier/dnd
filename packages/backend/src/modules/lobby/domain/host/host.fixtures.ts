import { UniqueId } from "src/modules/shared/domain/unique-id";

export const FAKE_HOST_ID = "00000000-0000-0000-0000-100000000000";
export const FAKE_HOST: {
  userId: UniqueId;
} = {
  userId: new UniqueId(FAKE_HOST_ID),
};
