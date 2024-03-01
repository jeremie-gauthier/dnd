export const CampaignStatus = {
  AVAILABLE: "AVAILABLE",
  COMING_SOON: "COMING_SOON",
  DISABLED: "DISABLED",
} as const;

export const CampaignStatusValues = Object.values(CampaignStatus);

export type CampaignStatusType =
  (typeof CampaignStatus)[keyof typeof CampaignStatus];
