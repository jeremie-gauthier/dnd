import { useTranslation } from "react-i18next";
import { classNames } from "../../../utils/class-names.util";
import { useGetChestLootContext } from "./GetChestLootContext";

const translationsKeys = {
  confirm_loot_swap: {
    prompt: "confirm_loot_swap_prompt",
    instructions: "confirm_loot_swap_instructions",
  },
};

export const GetChestLootTooltip = () => {
  const { t } = useTranslation(["inventory"]);
  const { cursorPositionWithOffset, tooltipType } = useGetChestLootContext();

  if (!tooltipType) {
    return null;
  }

  return (
    <div
      className={classNames(
        "fixed z-[9999] rounded-md p-2 font-semibold flex flex-col",
        tooltipType === "confirm_loot_swap" ? "bg-red-400" : "",
      )}
      style={{
        transform: `translate3d(${cursorPositionWithOffset.x}px, ${cursorPositionWithOffset.y}px, 0)`,
      }}
    >
      <span>{t(translationsKeys[tooltipType].prompt)}</span>
      <span className="font-normal italic">
        {t(translationsKeys[tooltipType].instructions)}
      </span>
    </div>
  );
};
