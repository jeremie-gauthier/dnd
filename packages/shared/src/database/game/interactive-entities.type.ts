type BaseInteractiveEntity = {
  type: "INTERACTIVE_ENTITY";
  isVisible: boolean;
  isBlocking: boolean;
  canInteract: boolean;
};

export type DoorEntity = BaseInteractiveEntity & {
  kind: "door";
};

export type TrapEntity = BaseInteractiveEntity & {
  kind: "trap";
  name: "pit";
};

export type ChestEntity = BaseInteractiveEntity & {
  kind: "chest";
};
