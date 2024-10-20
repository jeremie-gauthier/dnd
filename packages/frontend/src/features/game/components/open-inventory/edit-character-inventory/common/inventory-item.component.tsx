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
          <div className="absolute hidden inset-0 bg-black bg-opacity-35 text-white text-sm group-hover:flex flex-col p-1">
            <p>{t(item.name)}</p>
          </div>
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
