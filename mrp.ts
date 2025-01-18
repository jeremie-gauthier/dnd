class Burn {
  constructor(private affectedEntity: Hero) {}

  public onTurnStart() {
    this.affectedEntity.takeDamage(1);
  }
}

class Hero {
  hp: number;
  conditions: Array<Burn>;

  constructor() {
    this.hp = 10;
    this.conditions = [];
  }

  public addCondition(condition: Burn) {
    this.conditions.push(condition);
  }

  public takeDamage(amount: number) {
    this.hp -= amount;
  }

  // imagine que le Hero attaque avec une épée enflammée
  public inflictDamage(amount: number, targetEntity: Hero) {
    targetEntity.addCondition(new Burn(targetEntity));
    targetEntity.takeDamage(amount);
  }

  // imagine que le Hero se brûle à cause de l'une de ses actions
  public walkOnFire() {
    this.addCondition(new Burn(this)); // <- c'est pas trop chelou ce truc ?
  }
}
