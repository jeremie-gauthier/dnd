import {
  BackpackItem,
  GearItem,
} from "@features/game/interfaces/dnd-api/item.interface";
import { useTranslation } from "react-i18next";

type Props = {
  item: GearItem | BackpackItem;
};

export const InventoryItem = ({ item }: Props) => {
  const { t } = useTranslation(["items"]);

  // const regularAttack = item.attacks.find(
  //   (attack) => attack.type === "regular",
  // );

  // if (!regularAttack) return null;

  // const minDamage = sum(...regularAttack.dices.map(({ minValue }) => minValue));
  // const maxDamage = sum(...regularAttack.dices.map(({ maxValue }) => maxValue));
  // const mean =
  //   Math.round(
  //     (sum(...regularAttack.dices.map(({ values }) => sum(...values))) /
  //       (regularAttack.dices.length * 6)) *
  //       10,
  //   ) / 10;

  return (
    <div>
      <img src={item.imgUrl} alt={item.name} className="rounded" />
      <div className="absolute hidden inset-0 bg-black bg-opacity-35 text-white text-sm group-hover:flex flex-col p-1">
        <p>{t(item.name)}</p>
        {/* <p>
          {minDamage}-{maxDamage}(~{mean}) dmg
        </p> */}
      </div>
    </div>
  );
};
