import { Injectable } from "@nestjs/common";
import { InitiativeRollRepository } from "./initiative-roll.repository";

@Injectable()
export class InitiativeRollListener {
  constructor(private readonly repository: InitiativeRollRepository) {}

  // @OnEvent()
  public async handler(payload: unknown) {}
}
