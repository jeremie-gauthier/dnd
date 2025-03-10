import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UseCase } from "src/interfaces/use-case.interface";
import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import {
  MOVE_MANAGER_REPOSITORY,
  MoveManagerRepository,
} from "../../repositories/move-manager-repository.interface";
import { DomainEventsDispatcherService } from "../../services/domain-events-dispatcher.service";
import { PlayableEntityMoveInputDto } from "./playable-entity-move.dto";

@Injectable()
export class PlayableEntityMoveUseCase implements UseCase {
  constructor(
    @Inject(MOVE_MANAGER_REPOSITORY)
    private readonly moveManagerRepository: MoveManagerRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly domainEventsDispatcherService: DomainEventsDispatcherService,
  ) {}

  public async execute({
    gameId,
    pathToTile,
    userId,
  }: PlayableEntityMoveInputDto & {
    userId: User["id"];
  }): Promise<void> {
    const moveManager = await this.moveManagerRepository.getOneOrThrow({
      gameId,
    });
    const pathToTileDomain = pathToTile.map((coord) => new Coord(coord));
    moveManager.playerMove({ userId, pathToTile: pathToTileDomain });

    await this.moveManagerRepository.update({ game: moveManager });

    // const plainGame = game.toPlain();
    // this.eventEmitter.emitAsync(
    //   GameEvent.GameUpdated,
    //   new GameUpdatedPayload({ game: plainGame }),
    // );

    // const domainEvents = game.collectDomainEvents();
    // this.domainEventsDispatcherService.dispatch({
    //   domainEvents,
    //   game: plainGame,
    // });
  }
}
