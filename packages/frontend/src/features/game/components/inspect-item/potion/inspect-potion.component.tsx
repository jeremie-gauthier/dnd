import { GameItem } from "@dnd/shared";
import { useTranslation } from "react-i18next";

type Props = {
  potion: Extract<GameItem, { type: "Potion" }>;
};

export const InspectPotion = ({ potion }: Props) => {
  const { t } = useTranslation(["items"]);

  return (
    <div className="flex flex-col gap-3 max-w-56">
      <p>{t("freeAction")}</p>

      <hr className="border-primary-600" />

      <p>{t(`${potion.name}.description`)}</p>
    </div>
  );
};
