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
    <div className="flex flex-col">
      <span>{t(perk.trigger)} :</span>
      <span>• {t(`${perk.name}.description`)}</span>
    </div>
  );
};
