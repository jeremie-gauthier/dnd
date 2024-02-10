export const CampaignStageProgressionStatus = {
  AVAILABLE: 'AVAILABLE',
  COMPLETED: 'COMPLETED',
  LOCKED: 'LOCKED',
  STARTED: 'STARTED',
} as const;

export const CampaignStageProgressionStatusValues = Object.values(CampaignStageProgressionStatus);

export type CampaignStageProgressionStatusType =
  (typeof CampaignStageProgressionStatus)[keyof typeof CampaignStageProgressionStatus];
