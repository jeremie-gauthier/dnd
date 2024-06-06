import type { LobbyEntity, PickHeroInput } from "@dnd/shared";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvSchema } from "src/config/env.config";
import type { Hero } from "src/database/entities/hero.entity";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { RoleService } from "../services/role/role.service";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";

@Injectable()
export class PickHeroUseCase implements UseCase {
  constructor(
    private readonly configService: ConfigService<EnvSchema>,
    private readonly backupService: BackupService,
    private readonly seatManagerService: SeatManagerService,
    private readonly roleService: RoleService,
  ) {}

  public async execute({
    userId,
    lobbyId,
    heroId,
  }: PickHeroInput & {
    userId: User["id"];
  }): Promise<void> {
    // TODO: the lobby fetched might lack of a lock
    const lobby = await this.backupService.getLobbyOrThrow({ lobbyId });
    this.mustExecute({ lobby, userId, heroId });

    this.pickHero({ lobby, userId, heroId });

    await this.backupService.updateLobby({ lobby });
  }

  private mustExecute({
    lobby,
    userId,
    heroId,
  }: {
    lobby: LobbyEntity;
    userId: User["id"];
    heroId: Hero["id"];
  }) {
    if (lobby.status !== "OPENED") {
      throw new ForbiddenException("Lobby is not opened");
    }

    const isEnabled =
      this.configService.getOrThrow("NODE_ENV") !== "development";
    if (isEnabled && lobby.gameMaster.userId === userId) {
      throw new ForbiddenException(
        "You cannot pick any hero when you are the Game Master",
      );
    }

    const player = this.seatManagerService.getPlayerOrThrow({ lobby, userId });
    if (player.isReady) {
      throw new ForbiddenException("You cannot pick hero when you are ready");
    }

    this.roleService.mustBePickableHero({ lobby, heroId });
  }

  private pickHero({
    lobby,
    userId,
    heroId,
  }: {
    lobby: LobbyEntity;
    userId: User["id"];
    heroId: Hero["id"];
  }) {
    const hero = lobby.heroesAvailable.find(({ id }) => id === heroId)!;
    const player = lobby.players.find((player) => player.userId === userId)!;

    player.heroesSelected.push(heroId);
    hero.pickedBy = userId;
  }
}
