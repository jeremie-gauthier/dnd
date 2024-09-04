import {
  Dispatch,
  MouseEventHandler,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type CharacterSheetContextValue = {
  cursorPositionWithOffset: { x: number; y: number };
  updateCursorPosition: MouseEventHandler<HTMLDivElement>;
  tooltipType: "confirm_delete" | "confirm_swap" | "confirm_move" | null;
  setTooltipType: Dispatch<
    SetStateAction<"confirm_delete" | "confirm_swap" | "confirm_move" | null>
  >;
};

const CharacterSheetContext = createContext<CharacterSheetContextValue>({
  cursorPositionWithOffset: { x: 0, y: 0 },
  updateCursorPosition: () => undefined,
  tooltipType: null,
  setTooltipType: () => undefined,
});

export const useCharacterSheetContext = () => {
  const context = useContext(CharacterSheetContext);
  if (!context) {
    throw new Error("CharacterSheetContext.Provider is missing");
  }
  return context;
};

type Props = PropsWithChildren;

export const CharacterSheetContextProvider = ({ children }: Props) => {
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

  const [tooltipType, setTooltipType] = useState<
    "confirm_delete" | "confirm_swap" | "confirm_move" | null
  >(null);

  return (
    <CharacterSheetContext.Provider
      value={{
        cursorPositionWithOffset,
        updateCursorPosition,
        tooltipType,
        setTooltipType,
      }}
    >
      {children}
    </CharacterSheetContext.Provider>
  );
};
