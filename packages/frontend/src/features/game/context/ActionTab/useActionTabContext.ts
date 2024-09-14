import { useContext } from "react";
import { ActionTabContext } from "./ActionTabContext";

export const useActionTabContext = () => {
  return useContext(ActionTabContext);
};
