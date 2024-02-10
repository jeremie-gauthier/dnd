export const CampaignStageStatus = {
  AVAILABLE: 'AVAILABLE',
  COMING_SOON: 'COMING_SOON',
  DISABLED: 'DISABLED',
} as const;

export const CampaignStageStatusValues = Object.values(CampaignStageStatus);

export type CampaignStageStatusType =
  (typeof CampaignStageStatus)[keyof typeof CampaignStageStatus];
