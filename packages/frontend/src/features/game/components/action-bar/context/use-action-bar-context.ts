import { useContext } from "react";
import { ActionBarContext } from "./action-bar.context";

export const useActionBarContext = () => {
  return useContext(ActionBarContext);
};
