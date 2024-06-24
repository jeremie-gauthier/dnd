export const FAKE_HOST_ID = "00000000-0000-0000-0000-100000000000";
export const getFakeHost = (): {
  userId: string;
} => {
  return {
    userId: FAKE_HOST_ID,
  };
};
