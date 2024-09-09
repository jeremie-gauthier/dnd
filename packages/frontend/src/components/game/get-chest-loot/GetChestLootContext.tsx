import {
  Dispatch,
  MouseEventHandler,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type GetChestLootContextValue = {
  cursorPositionWithOffset: { x: number; y: number };
  updateCursorPosition: MouseEventHandler<HTMLDivElement>;
  tooltipType: "confirm_loot_swap" | null;
  setTooltipType: Dispatch<SetStateAction<"confirm_loot_swap" | null>>;
};

const GetChestLootContext = createContext<GetChestLootContextValue>({
  cursorPositionWithOffset: { x: 0, y: 0 },
  updateCursorPosition: () => undefined,
  tooltipType: null,
  setTooltipType: () => undefined,
});

export const useGetChestLootContext = () => {
  const context = useContext(GetChestLootContext);
  if (!context) {
    throw new Error("GetChestLootContext.Provider is missing");
  }
  return context;
};

type Props = PropsWithChildren;

export const GetChestLootContextProvider = ({ children }: Props) => {
  const [cursorPositionWithOffset, setCursorPositionWithOffset] = useState({
    x: 0,
    y: 0,
  });
  const updateCursorPosition: MouseEventHandler<HTMLDivElement> = (event) => {
    setCursorPositionWithOffset({
      x: event.clientX + 20,
      y: event.clientY + 20,
    });
  };

  const [tooltipType, setTooltipType] = useState<"confirm_loot_swap" | null>(
    null,
  );

  return (
    <GetChestLootContext.Provider
      value={{
        cursorPositionWithOffset,
        updateCursorPosition,
        tooltipType,
        setTooltipType,
      }}
    >
      {children}
    </GetChestLootContext.Provider>
  );
};
