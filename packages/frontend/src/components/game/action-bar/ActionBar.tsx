import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import { classNames } from "../../../utils/class-names.util";
import { useGameContext } from "../context/useGameContext";
import { ActionTab } from "./ActionTab";
import { BackpackInventory } from "./BackpackInventory";
import { GearInventory } from "./GearInventory";

export const ActionBar = () => {
  const { isPlaying, heroPlaying } = useGameContext();
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!isPlaying || !heroPlaying) return null;

  return (
    <TabGroup
      className="flex flex-col items-center justify-between h-42 min-w-96"
      defaultIndex={0}
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <TabPanels>
        <TabPanel className="flex flex-row gap-2">
          <ActionTab
            gear={heroPlaying.inventory.gear}
            storageCapacity={heroPlaying.inventory.storageCapacity}
          />
        </TabPanel>
        <TabPanel className="flex flex-row gap-2">
          <GearInventory
            gear={heroPlaying.inventory.gear}
            storageCapacity={heroPlaying.inventory.storageCapacity}
          />
        </TabPanel>
        <TabPanel className="flex flex-row gap-2">
          <BackpackInventory
            backpack={heroPlaying.inventory.backpack}
            storageCapacity={heroPlaying.inventory.storageCapacity}
          />
        </TabPanel>
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
          Actions
        </Tab>
        <Tab
          className={classNames(
            "py-1 w-28 text-sm font-semibold",
            selectedIndex === 1
              ? "bg-amber-800 text-white"
              : "border-y border-amber-800 text-amber-800",
          )}
        >
          Gear
        </Tab>
        <Tab
          className={classNames(
            "py-1 rounded-r w-28 text-sm font-semibold",
            selectedIndex === 2
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
