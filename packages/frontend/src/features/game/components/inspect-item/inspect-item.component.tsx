import { GameItem } from "@dnd/shared";
import { useTranslation } from "react-i18next";
import { InspectArtifact } from "./artifact/inspect-artifact.component";
import { InspectPotion } from "./potion/inspect-potion.component";
import { InspectSpell } from "./spell/inspect-spell.component";
import { InspectWeapon } from "./weapon/inspect-weapon.component";

type Props = {
  item: GameItem;
};

export const InspectItem = ({ item }: Props) => {
  const { t } = useTranslation(["items"]);

  return (
    <div className="flex flex-col shadow-lg  bg-slate-900 rounded-md z-50">
      <div className="flex flex-col bg-slate-500 p-2 rounded-t-md justify-start">
        <h5 className="font-semibold text-lg">{t(item.name)}</h5>
        <span>{t("itemIdentity", { type: item.type, level: item.level })}</span>
      </div>

      <div className="bg-slate-700 rounded-b-md p-2">
        <ItemInspector item={item} />
      </div>
    </div>
  );
};

const ItemInspector = ({ item }: Props) => {
  switch (item.type) {
    case "Weapon":
      return <InspectWeapon weapon={item} />;
    case "Spell":
      return <InspectSpell spell={item} />;
    case "Potion":
      return <InspectPotion potion={item} />;
    case "Artifact":
      return <InspectArtifact artifact={item} />;
    case "ChestTrap":
      return null;
  }
};
