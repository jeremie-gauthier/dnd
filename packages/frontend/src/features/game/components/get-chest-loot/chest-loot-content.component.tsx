import { Icon } from "@/components/icon/Icon";
import { Button } from "@/components/ui/button";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GameItem } from "@dnd/shared";
import { cn } from "@lib/utils";
import { useTranslation } from "react-i18next";
import { slotTypeColor } from "../utils";

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

  return (
    <div className="flex flex-col items-center bg-slate-800 gap-8 rounded-b-md">
      <div className="flex flex-row bg-slate-500 w-full py-4 text-white font-semibold text-xl justify-center">
        <h4>{t("chest_loot_title", { ns: "inventory" })}</h4>
      </div>

      <div className="flex flex-col items-center gap-8 px-12 pb-8">
        <div className={cn("border-2 rounded", slotTypeColor[item.type])}>
          <Icon
            icon="openChest"
            className="absolute z-0 fill-slate-500 h-32 w-28"
          />
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
            </div>
          </div>
        </div>

        <Button variant="secondary" onClick={onRefuseLoot}>
          {t("refuse_loot", { ns: "inventory" })}
        </Button>
      </div>
    </div>
  );
};
