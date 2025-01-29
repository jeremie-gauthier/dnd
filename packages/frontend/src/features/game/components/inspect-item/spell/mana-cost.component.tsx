import { Icon } from "@/components/icon/Icon";
import { SpellResponseDto } from "@/openapi/dnd-api";
import { useGameContext } from "@features/game/context/use-game-context";
import { useTranslation } from "react-i18next";

type Props = {
  manaCost: SpellResponseDto["manaCost"];
};

export const ManaCost = ({ manaCost }: Props) => {
  const { t } = useTranslation(["items"]);
  const { entityPlaying } = useGameContext();

  if (!entityPlaying || entityPlaying.faction === "monster") {
    return null;
  }

  const manaCostForEntityPlaying = manaCost[entityPlaying.class];
  if (manaCostForEntityPlaying === undefined) {
    return <p className="text-red-500 italic">{t("cannotCastSpell")}</p>;
  }

  return (
    <p className="flex flex-row items-center">
      <span>{manaCostForEntityPlaying}</span>
      <Icon icon="wizardStaff" className="fill-blue-600 mx-1" />
      <span>{t("perUse")}</span>
    </p>
  );
};
