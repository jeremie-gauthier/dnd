import { Injectable } from "@nestjs/common";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { UseCase } from "src/interfaces/use-case.interface";

@Injectable()
export class HandleAnyEventUseCase implements UseCase {
  public async execute(data: EventPayload<any>): Promise<void> {
    console.log("spying event", data.name);
  }
}
