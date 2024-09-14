import { useTranslation } from "react-i18next";
import { classNames } from "../../../utils/class-names.util";
import { useEditCharacterInventoryContext } from "./EditCharacterInventoryContext";

const translationsKeys = {
  confirm_delete: {
    prompt: "confirm_deletion_prompt",
    instructions: "confirm_deletion_instructions",
  },
  confirm_swap: {
    prompt: "confirm_swap_prompt",
    instructions: "confirm_swap_instructions",
  },
  confirm_move: {
    prompt: "confirm_move_prompt",
    instructions: "confirm_move_instructions",
  },
};

export const EditCharacterInventoryTooltip = () => {
  const { t } = useTranslation(["inventory"]);
  const { cursorPositionWithOffset, tooltipType } =
    useEditCharacterInventoryContext();

  if (!tooltipType) {
    return null;
  }

  return (
    <div
      className={classNames(
        "fixed z-[9999] rounded-md p-2 font-semibold flex flex-col",
        tooltipType === "confirm_delete"
          ? "bg-red-400"
          : "bg-primary-600 border border-primary-900 text-white",
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
