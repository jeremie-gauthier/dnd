import { PlayableEntity } from "@dnd/shared";

type Props = {
  character: PlayableEntity;
};

export const CharacterIdentity = ({ character }: Props) => {
  // TODO: ajouter de la traduction
  return (
    <div className="flex flex-col text-white">
      <h4 className="font-semibold text-xl">{character.name}</h4>
      <div className="flex flex-row text-xs font-light">
        {character.faction === "hero" ? (
          <span>
            {character.class} NIVEAU {character.level}
          </span>
        ) : (
          <span>{character.kind}</span>
        )}
      </div>
    </div>
  );
};
