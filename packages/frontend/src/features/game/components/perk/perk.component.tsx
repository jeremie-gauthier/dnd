import { useTranslation } from "react-i18next";

type Props = {
  perk: {
    name: string;
    trigger: string;
  };
};

export const Perk = ({ perk }: Props) => {
  const { t } = useTranslation(["perks"]);

  return (
    <div>
      {t(perk.trigger)}: {t(`${perk.name}.description`)}
    </div>
  );
};
