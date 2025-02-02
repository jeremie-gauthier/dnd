import { PotionResponseDto } from "@/openapi/dnd-api";

type Props = {
  item: PotionResponseDto;
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
