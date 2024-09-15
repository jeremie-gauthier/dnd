import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GameItem, sum } from "@dnd/shared";
import { useTranslation } from "react-i18next";

type Props = {
  item: GameItem;
  storageSpace: "gear" | "backpack";
};

export const InventoryItem = ({ item, storageSpace }: Props) => {
  const { t } = useTranslation(["items"]);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-item-${item.name}`,
    data: { item, storageSpace },
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
    <button
      type="button"
      ref={setNodeRef}
      style={
        transform
          ? { transform: CSS.Translate.toString(transform), zIndex: 99 }
          : undefined
      }
      {...listeners}
      {...attributes}
    >
      <img src={item.imgUrl} alt={item.name} className="rounded" />
      <div className="absolute hidden inset-0 bg-black bg-opacity-35 text-white text-sm group-hover:flex flex-col p-1">
        <p>{t(item.name)}</p>
        <p>
          {minDamage}-{maxDamage}(~{mean}) dmg
        </p>
      </div>
    </button>
  );
};
