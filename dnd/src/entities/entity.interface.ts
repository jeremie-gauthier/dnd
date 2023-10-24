export interface Entity {
  type: string;
  isBlocking: boolean;
  // TODO: what it looks like
  getRepresentation: () => any;
  toString: () => string;
}
