type DoorOpenedEntity = {
  type: "interactive-entity";
  kind: "door";
  isVisible: true;
  isBlocking: false;
  canInteract: false;
};

type DoorClosedEntity = {
  type: "interactive-entity";
  kind: "door";
  isVisible: true;
  isBlocking: true;
  canInteract: true;
};

export type DoorEntity = DoorClosedEntity | DoorOpenedEntity;

type TrapPitActiveEntity = {
  type: "interactive-entity";
  kind: "trap";
  name: "pit";
  isVisible: false;
  isBlocking: false;
  canInteract: true;
};

type TrapPitInactiveEntity = {
  type: "interactive-entity";
  kind: "trap";
  name: "pit";
  isVisible: true;
  isBlocking: false;
  canInteract: false;
};

export type TrapEntity = TrapPitActiveEntity | TrapPitInactiveEntity;

export type ChestEntity = {
  type: "interactive-entity";
  kind: "chest";
  isVisible: true;
  isBlocking: false;
  canInteract: true;
};
