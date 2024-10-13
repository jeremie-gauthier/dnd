import gameMaster from "@assets/classes/game_master.webp";
import { useTranslation } from "react-i18next";

export const GameMasterCard = () => {
  const { t } = useTranslation(["lobbies"]);

  return (
    <>
      <img src={gameMaster} alt="" width={200} className="h-64" />
      <h3 className="font-medium">{t("gameMaster")}</h3>
      <div className="flex gap-2">
        <p>{t("gameMaster.description")}</p>
      </div>
    </>
  );
};
