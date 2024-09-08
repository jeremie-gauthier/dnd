import {
  Dispatch,
  MouseEventHandler,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type EditCharacterInventoryContextValue = {
  cursorPositionWithOffset: { x: number; y: number };
  updateCursorPosition: MouseEventHandler<HTMLDivElement>;
  tooltipType: "confirm_delete" | "confirm_swap" | "confirm_move" | null;
  setTooltipType: Dispatch<
    SetStateAction<"confirm_delete" | "confirm_swap" | "confirm_move" | null>
  >;
};

const EditCharacterInventoryContext =
  createContext<EditCharacterInventoryContextValue>({
    cursorPositionWithOffset: { x: 0, y: 0 },
    updateCursorPosition: () => undefined,
    tooltipType: null,
    setTooltipType: () => undefined,
  });

export const useEditCharacterInventoryContext = () => {
  const context = useContext(EditCharacterInventoryContext);
  if (!context) {
    throw new Error("EditCharacterInventoryContext.Provider is missing");
  }
  return context;
};

type Props = PropsWithChildren;

export const EditCharacterInventoryContextProvider = ({ children }: Props) => {
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
    <EditCharacterInventoryContext.Provider
      value={{
        cursorPositionWithOffset,
        updateCursorPosition,
        tooltipType,
        setTooltipType,
      }}
    >
      {children}
    </EditCharacterInventoryContext.Provider>
  );
};
