import { useTranslation } from "react-i18next";

type Props = {
  campaignId: string;
  campaignStageOrder: number;
  campaignNbStages: number;
};

export const CampaignStageDescription = ({
  campaignId,
  campaignStageOrder,
  campaignNbStages,
}: Props) => {
  const { t } = useTranslation(["campaigns"]);

  return (
    <div className="max-w-5xl m-auto">
      <h1 className="font-semibold text-lg">
        {t(`${campaignId}.title`)}
        <span className="ml-1 font-normal text-sm">
          (
          {t("campaignStageOverview", {
            stageOrder: campaignStageOrder,
            maxStageOrder: campaignNbStages,
          })}
          )
        </span>
      </h1>
      <p className="font-medium">
        {t(`${campaignId}.stage_${campaignStageOrder}.title`)}
      </p>
      <p className="italic">
        {t(`${campaignId}.stage_${campaignStageOrder}.intro`)}
      </p>
    </div>
  );
};
