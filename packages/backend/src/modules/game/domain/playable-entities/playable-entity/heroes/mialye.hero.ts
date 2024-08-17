import { Hero } from "./hero.abstract";

export class Mialye extends Hero {
  public consumeMana({ amount }: { amount: number }) {
    if (amount > this._data.characteristic.manaPoints) {
      this._data.characteristic.manaPoints = 0;
    } else {
      this._data.characteristic.manaPoints -= amount;
    }

    if (this._data.characteristic.manaPoints >= 3) {
      this._data.characteristic.armorClass = 2;
    } else if (this._data.characteristic.manaPoints >= 1) {
      this._data.characteristic.armorClass = 1;
    } else {
      this._data.characteristic.armorClass = 0;
    }
  }
}
