export const StorageSpace = {
  GEAR: "GEAR",
  BACKPACK: "BACKPACK",
} as const;

export const StorageSpaceValues = Object.values(StorageSpace);

export type StorageSpaceType = (typeof StorageSpace)[keyof typeof StorageSpace];
