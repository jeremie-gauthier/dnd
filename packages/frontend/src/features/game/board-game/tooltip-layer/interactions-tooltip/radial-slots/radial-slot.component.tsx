import { Interaction } from "@features/game/game-engine/events/interactions-authorized.event";
import { AttackRadialSlot } from "./attack-radial-slot.component";
import { OpenDoorRadialSlot } from "./open-door-radial-slot.component";

type Props = {
  interaction: Interaction & { radius: number; x: number; y: number };
};

export const RadialSlot = ({ interaction }: Props) => {
  switch (interaction.name) {
    case "attack":
      return <AttackRadialSlot interaction={interaction} />;
    case "openDoor":
      return <OpenDoorRadialSlot interaction={interaction} />;
    case "openChest":
      return null;
  }
};
