import crypto from "node:crypto";

export function randomInt() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0]!;
}
