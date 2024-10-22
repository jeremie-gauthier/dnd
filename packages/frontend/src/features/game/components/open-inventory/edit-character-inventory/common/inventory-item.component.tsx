import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GameItem } from "@dnd/shared";
import { InspectItem } from "@features/game/components/inspect-item/inspect-item.component";

type Props = {
  item: GameItem;
  storageSpace: "gear" | "backpack";
};

export const InventoryItem = ({ item, storageSpace }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-item-${item.name}`,
    data: { item, storageSpace },
  });

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger
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
        </TooltipTrigger>

        <TooltipContent
          sideOffset={8}
          className="border-0 bg-slate-500 text-white p-0 shadow-md"
        >
          <InspectItem item={item} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
