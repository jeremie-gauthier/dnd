import { ChildEntity } from "typeorm";
import { AttackItem } from "./attack-item.entity";

@ChildEntity()
export class Weapon extends AttackItem {}
