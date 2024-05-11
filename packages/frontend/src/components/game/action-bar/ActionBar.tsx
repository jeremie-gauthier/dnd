import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import { classNames } from "../../../utils/class-names.util";
import { useGameContext } from "../context/useGameContext";

export const ActionBar = () => {
  const { isPlaying, heroPlaying } = useGameContext();
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!isPlaying || !heroPlaying) return null;

  return (
    <TabGroup
      className="flex flex-col justify-between h-42"
      defaultIndex={0}
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <TabPanels>
        <TabPanel>Gear slots</TabPanel>
        <TabPanel>Backpack slots</TabPanel>
      </TabPanels>

      <TabList className="flex flex-row">
        <Tab
          className={classNames(
            "py-1 rounded-l w-28 text-sm font-semibold",
            selectedIndex === 0
              ? "bg-amber-800 text-white"
              : "border border-amber-800 text-amber-800",
          )}
        >
          Gear
        </Tab>
        <Tab
          className={classNames(
            "py-1 rounded-r w-28 text-sm font-semibold",
            selectedIndex === 1
              ? "bg-amber-800 text-white"
              : "border border-amber-800 text-amber-800",
          )}
        >
          Backpack
        </Tab>
      </TabList>
    </TabGroup>
  );
};
