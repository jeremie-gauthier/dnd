export const StorageSpace = {
  GEAR: "gear",
  BACKPACK: "backpack",
} as const;

export const StorageSpaceValues = Object.values(StorageSpace);

export type StorageSpaceType = (typeof StorageSpace)[keyof typeof StorageSpace];
