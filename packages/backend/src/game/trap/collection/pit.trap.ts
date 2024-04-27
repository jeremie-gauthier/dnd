import { TrapTrigger } from "./trap.interface";

export const pitTrapTrigger: TrapTrigger = ({ trapEntity, subjectEntity }) => {
  // TODO: move this logic in a dedicated health service that'll be able to handle death status
  subjectEntity.healthPoints -= 1;

  trapEntity.canInteract = false;
  trapEntity.isVisible = true;
};
