import { Hero } from "./hero.abstract";

export class Mialye extends Hero {
  public consumeMana({ amount }: { amount: number }) {
    if (amount > this._data.characteristic.manaPoints) {
      this._data.characteristic.manaPoints = 0;
    } else {
      this._data.characteristic.manaPoints -= amount;
    }

    this._data.characteristic.armorClass = this.getArmorClassFromMana();
  }

  public resetArmorClass() {
    this._data.characteristic.armorClass = this.getArmorClassFromMana();
  }

  private getArmorClassFromMana() {
    if (this._data.characteristic.manaPoints >= 3) {
      return 2;
    } else if (this._data.characteristic.manaPoints >= 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
