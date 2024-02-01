export const CampaignProgressionStatus = {
  AVAILABLE: 'AVAILABLE',
  COMPLETED: 'COMPLETED',
  LOCKED: 'LOCKED',
  STARTED: 'STARTED',
} as const;

export const CampaignProgressionStatusValues = Object.values(CampaignProgressionStatus);

export type CampaignProgressionStatusType =
  (typeof CampaignProgressionStatus)[keyof typeof CampaignProgressionStatus];
