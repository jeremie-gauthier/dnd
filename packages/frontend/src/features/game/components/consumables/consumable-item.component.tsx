import { GameItem } from "@dnd/shared";

type Props = {
  item: Extract<GameItem, { type: "Potion" }>;
};

export const ConsumableItem = ({ item }: Props) => {
  return (
    <img
      src={item.imgUrl}
      alt={item.name}
      className="rounded hover:saturate-200 duration-100"
    />
  );
};
