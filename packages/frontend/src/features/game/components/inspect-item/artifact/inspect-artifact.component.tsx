import { GameItem } from "@dnd/shared";
import { useTranslation } from "react-i18next";

type Props = {
  artifact: Extract<GameItem, { type: "Artifact" }>;
};

export const InspectArtifact = ({ artifact }: Props) => {
  const { t } = useTranslation(["items"]);

  return (
    <div className="flex flex-col gap-3 max-w-56">
      <p>Description de l'artefact ICI</p>

      {artifact.hasSavingThrow ? <p>{t("artifactSavingThrow")}</p> : null}
    </div>
  );
};
