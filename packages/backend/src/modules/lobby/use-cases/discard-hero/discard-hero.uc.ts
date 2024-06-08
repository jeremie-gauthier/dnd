import type { DiscardHeroInput, LobbyEntity } from "@dnd/shared";
import { ForbiddenException, Injectable } from "@nestjs/common";
import type { Hero } from "src/database/entities/hero.entity";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { BackupService } from "../../domain/backup/backup.service";
import { RoleService } from "../../domain/role/role.service";
import { SeatManagerService } from "../../domain/seat-manager/seat-manager.service";

@Injectable()
export class DiscardHeroUseCase implements UseCase {
  constructor(
    private readonly backupService: BackupService,
    private readonly seatManagerService: SeatManagerService,
    private readonly roleService: RoleService,
  ) {}

  public async execute({
    userId,
    lobbyId,
    heroId,
  }: DiscardHeroInput & {
    userId: User["id"];
  }): Promise<void> {
    const lobby = await this.backupService.getLobbyOrThrow({ lobbyId });
    this.mustExecute({ lobby, userId, heroId });

    this.discardHero({ lobby, userId, heroId });

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

    const player = this.seatManagerService.getPlayerOrThrow({ lobby, userId });
    if (player.isReady) {
      throw new ForbiddenException(
        "You cannot discard hero when you are ready",
      );
    }

    const hero = this.roleService.getHeroOrThrow({ lobby, heroId });
    this.roleService.mustOwnTheHero({ player, hero });
  }

  private discardHero({
    lobby,
    userId,
    heroId,
  }: {
    lobby: LobbyEntity;
    userId: User["id"];
    heroId: Hero["id"];
  }) {
    const player = this.seatManagerService.getPlayerOrThrow({ lobby, userId });

    const hero = this.roleService.getHeroOrThrow({ lobby, heroId });

    player.heroesSelected = player.heroesSelected.filter((id) => id !== heroId);
    hero.pickedBy = undefined;
  }
}
