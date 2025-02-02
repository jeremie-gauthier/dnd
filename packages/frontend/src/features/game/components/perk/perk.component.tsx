import { PerkResponseDto } from "@/openapi/dnd-api";
import { useTranslation } from "react-i18next";

type Props = {
  perk: PerkResponseDto;
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
