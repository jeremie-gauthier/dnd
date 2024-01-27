export const CampaignProgressionStatus = {
  AVAILABLE: 'AVAILABLE',
  LOCKED: 'LOCKED',
  STARTED: 'STARTED',
} as const;

export const CampaignProgressionStatusValues = Object.values(CampaignProgressionStatus);

export type CampaignProgressionStatusType =
  (typeof CampaignProgressionStatus)[keyof typeof CampaignProgressionStatus];
