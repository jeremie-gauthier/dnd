import { PotionResponseDto } from "@/openapi/dnd-api";
import { useTranslation } from "react-i18next";

type Props = {
  potion: PotionResponseDto;
};

export const InspectPotion = ({ potion }: Props) => {
  const { t } = useTranslation(["items"]);

  return (
    <div className="flex flex-col gap-3 max-w-56">
      <p>{t("freeAction")}</p>

      <hr className="border-slate-500" />

      <p>{t(`${potion.name}.description`)}</p>
    </div>
  );
};
