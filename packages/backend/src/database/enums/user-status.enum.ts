export const UserStatus = {
  CREATED: "CREATED",
  INITIALIZED: "INITIALIZED",
} as const;

export const UserStatusValues = Object.values(UserStatus);

export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];
