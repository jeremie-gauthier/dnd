import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GameItem, sum } from "@dnd/shared";
import { useTranslation } from "react-i18next";
import { classNames } from "../../../utils/class-names.util";
import { IconOpenChest } from "../../icon/icons/IconOpenChest";
import { Button } from "../../shared/button/Button";

type Props = {
  item: GameItem;
  onRefuseLoot: () => void;
};

export const ChestLootContent = ({ item, onRefuseLoot }: Props) => {
  const { t } = useTranslation(["items", "inventory"]);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-item-${item.name}`,
    data: { item },
  });

  const regularAttack = item.attacks.find(
    (attack) => attack.type === "regular",
  );

  if (!regularAttack) return null;

  const minDamage = sum(...regularAttack.dices.map(({ minValue }) => minValue));
  const maxDamage = sum(...regularAttack.dices.map(({ maxValue }) => maxValue));
  const mean =
    Math.round(
      (sum(...regularAttack.dices.map(({ values }) => sum(...values))) /
        (regularAttack.dices.length * 6)) *
        10,
    ) / 10;

  return (
    <div className="flex flex-col items-center bg-primary-900 gap-8 rounded-b-md">
      <div className="flex flex-row bg-primary-600 w-full py-4 text-white font-semibold text-xl justify-center">
        <h4>{t("chest_loot_title", { ns: "inventory" })}</h4>
      </div>

      <div className="flex flex-col items-center gap-8 px-12 pb-8">
        <div
          className={classNames("border-2 rounded", slotTypeColor[item.type])}
        >
          <IconOpenChest className="absolute z-0 fill-primary-600 h-32 w-28" />
          <div
            ref={setNodeRef}
            style={
              transform
                ? { transform: CSS.Translate.toString(transform), zIndex: 99 }
                : undefined
            }
            {...listeners}
            {...attributes}
            className="relative h-32 w-28 group"
          >
            <img src={item.imgUrl} alt={item.name} className="rounded" />
            <div className="absolute hidden inset-0 bg-black bg-opacity-35 text-white text-sm group-hover:flex flex-col p-1">
              <p>{t(item.name, { ns: "items" })}</p>
              <p>
                {minDamage}-{maxDamage}(~{mean}) dmg
              </p>
            </div>
          </div>
        </div>

        <Button variant="outlined" onClick={onRefuseLoot}>
          {t("refuse_loot", { ns: "inventory" })}
        </Button>
      </div>
    </div>
  );
};

const slotTypeColor: Record<Props["item"]["type"], string> = {
  Spell: "border-blue-500",
  Weapon: "border-red-500",
};
