type DoorOpenedEntity = {
  type: "non-playable-interactive-entity";
  kind: "door";
  isVisible: true;
  isBlocking: false;
  canInteract: false;
};

type DoorClosedEntity = {
  type: "non-playable-interactive-entity";
  kind: "door";
  isVisible: true;
  isBlocking: true;
  canInteract: true;
};

export type DoorEntity = DoorClosedEntity | DoorOpenedEntity;

type TrapPitActiveEntity = {
  type: "non-playable-interactive-entity";
  kind: "trap";
  name: "pit";
  isVisible: false;
  isBlocking: false;
  canInteract: true;
};

type TrapPitInactiveEntity = {
  type: "non-playable-interactive-entity";
  kind: "trap";
  name: "pit";
  isVisible: true;
  isBlocking: false;
  canInteract: false;
};

export type TrapEntity = TrapPitActiveEntity | TrapPitInactiveEntity;
