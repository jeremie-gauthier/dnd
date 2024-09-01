import { PlayableEntity } from "@dnd/shared";
import { ActionPoints } from "../ActionPoints";
import { ArmourPoints } from "../ArmourPoints";
import { HealthPoints } from "../HealthPoints";
import { ManaPoints } from "../ManaPoints";
import { MovementPoints } from "../MovementPoints";

type Props = {
  character: PlayableEntity;
};

export const CharacterStats = ({ character }: Props) => {
  return (
    <>
      <HealthPoints size="medium" />
      <ManaPoints />
      <ArmourPoints />
      <ActionPoints />
      <MovementPoints />
    </>
  );
};
