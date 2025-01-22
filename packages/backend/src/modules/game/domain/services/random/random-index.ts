import { randomInt } from "./random-int";

export function randomIndex(exclusiveMax: number) {
  const randInt = randomInt();
  return randInt % exclusiveMax;
}
