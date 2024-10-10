import { PlayableEntity } from "@dnd/shared";
import { useTranslation } from "react-i18next";

type Props = {
  character: PlayableEntity;
};

export const CharacterIdentity = ({ character }: Props) => {
  const { t } = useTranslation(["inventory", "heroes"]);

  return (
    <div className="flex flex-col text-white">
      <h4 className="font-semibold text-xl">{character.name}</h4>
      <div className="flex flex-row text-xs font-light">
        {character.faction === "hero" ? (
          <span>
            {t("heroIdentity", {
              ns: "inventory",
              class: character.class,
              level: character.level,
            })}
          </span>
        ) : (
          <span>{t("monsterIdentity", { race: character.race })}</span>
        )}
      </div>
    </div>
  );
};
