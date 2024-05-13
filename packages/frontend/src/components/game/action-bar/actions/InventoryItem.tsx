import { GameItem, sum } from "@dnd/shared";

type Props = {
  item: GameItem;
};

export const InventoryItem = ({ item }: Props) => {
  const handleUseInventoryItem = () => {
    console.log("using", item.name, item.type);
  };

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
    <>
      {/* TODO: je n'aurais plus besoin des icones */}
      <button type="button" onClick={handleUseInventoryItem}>
        <img src={item.imgUrl} alt={item.name} className="rounded" />
        <div className="absolute hidden inset-0 bg-black bg-opacity-35 text-white text-sm group-hover:flex flex-col p-1">
          <p>{item.name}</p>
          <p>
            {minDamage}-{maxDamage}(~{mean}) dmg
          </p>
        </div>
      </button>
    </>
  );
};
