import { ArtifactResponseDto } from "@/openapi/dnd-api";
import { useTranslation } from "react-i18next";

type Props = {
  artifact: ArtifactResponseDto;
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
