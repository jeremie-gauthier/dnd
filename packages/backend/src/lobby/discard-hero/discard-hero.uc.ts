import type { DiscardHeroInput, LobbyEntity } from "@dnd/shared";
import { ForbiddenException, Injectable } from "@nestjs/common";
import type { Hero } from "src/database/entities/hero.entity";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/types/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { RoleService } from "../services/role/role.service";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";

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

    const isHeroPickedByUser =
      hero.pickedBy === userId && player.heroesSelected.includes(heroId);
    if (!isHeroPickedByUser) {
      throw new ForbiddenException(
        "You can only discard heroes you have picked",
      );
    }
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
