type BaseInteractiveEntity = {
  type: "interactive-entity";
  isVisible: boolean;
  isBlocking: boolean;
  canInteract: boolean;
};

type DoorEntity = BaseInteractiveEntity & {
  kind: "door";
};

type TrapEntity = BaseInteractiveEntity & {
  kind: "trap";
  name: "pit";
};

export type TileInteractiveEntity = DoorEntity | TrapEntity;
