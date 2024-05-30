import type { DiscardHeroInput, LobbyEntity } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type { Hero } from "src/database/entities/hero.entity";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/types/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { DiscardHeroRepository } from "./discard-hero.repository";

@Injectable()
export class DiscardHeroUseCase implements UseCase {
  constructor(
    private readonly repository: DiscardHeroRepository,
    private readonly backupService: BackupService,
  ) {}

  public async execute({
    userId,
    lobbyId,
    heroId,
  }: DiscardHeroInput & {
    userId: User["id"];
  }): Promise<void> {
    // TODO: the lobby fetched might lack of a lock
    const lobby = await this.repository.getLobbyById(lobbyId);
    this.assertCanDiscardHero(lobby, { userId, heroId });

    this.discardHero({ lobby, userId, heroId });

    await this.backupService.updateLobby({ lobby });
  }

  private assertCanDiscardHero(
    lobby: LobbyEntity | null,
    { userId, heroId }: { userId: User["id"]; heroId: Hero["id"] },
  ): asserts lobby is LobbyEntity {
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }

    if (lobby.status !== "OPENED") {
      throw new ForbiddenException("Lobby is not opened");
    }

    const playerIdx = lobby.players.findIndex(
      (player) => player.userId === userId,
    );
    if (playerIdx < 0) {
      throw new ForbiddenException(
        "You must be in the lobby to discard this hero",
      );
    }

    const player = lobby.players[playerIdx]!;
    if (player.isReady) {
      throw new ForbiddenException(
        "You cannot discard hero when you are ready",
      );
    }

    const heroIdx = lobby.heroesAvailable.findIndex(({ id }) => id === heroId);
    if (heroIdx < 0) {
      throw new NotFoundException("Hero not found");
    }

    const hero = lobby.heroesAvailable[heroIdx]!;

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
    const playerIdx = lobby.players.findIndex(
      (player) => player.userId === userId,
    );
    const player = lobby.players[playerIdx]!;

    const heroIdx = lobby.heroesAvailable.findIndex(({ id }) => id === heroId);
    const hero = lobby.heroesAvailable[heroIdx]!;

    player.heroesSelected = player.heroesSelected.filter((id) => id !== heroId);
    hero.pickedBy = undefined;
  }
}
