import { AttackRangeType, GameItem, sum } from "@dnd/shared";
import { Icon } from "../../../icon/Icon";
import { IconName } from "../../../icon/Icon.type";

type Props = {
  item: GameItem;
  attack: GameItem["attacks"][number];
};

export const AttackItem = ({ item, attack }: Props) => {
  const handleUseAttackItem = () => {
    console.log("using", item.name, item.type);
  };

  const minDamage = sum(...attack.dices.map(({ minValue }) => minValue));
  const maxDamage = sum(...attack.dices.map(({ maxValue }) => maxValue));
  const mean =
    Math.round(
      (sum(...attack.dices.map(({ values }) => sum(...values))) /
        (attack.dices.length * 6)) *
        10,
    ) / 10;

  return (
    <>
      <button type="button" onClick={handleUseAttackItem}>
        <img src={item.imgUrl} alt={item.name} className="rounded" />
        <div className="absolute top-1 right-1 h-8 w-8 rounded-full bg-orange-700 flex items-center justify-center">
          <Icon
            icon={attackRangeIcon[attack.range]}
            size="large"
            className="fill-white"
          />
        </div>
        <div className="absolute hidden inset-0 bg-black bg-opacity-35 text-white text-sm group-hover:flex flex-col p-1 items-start">
          <p>{item.name}</p>
          <p>{attack.type} attack</p>
          <p>
            {minDamage}-{maxDamage}(~{mean}) dmg
          </p>
        </div>
      </button>
    </>
  );
};

const attackRangeIcon: Record<AttackRangeType, IconName> = {
  melee: "meleeAttack",
  long: "rangeAttack",
  versatile: "versatileAttack",
};
