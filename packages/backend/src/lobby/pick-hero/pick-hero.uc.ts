import type { LobbyEntity, PickHeroInput } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvSchema } from "src/config/env.config";
import type { Hero } from "src/database/entities/hero.entity";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/types/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { PickHeroRepository } from "./pick-hero.repository";

@Injectable()
export class PickHeroUseCase implements UseCase {
  constructor(
    private readonly repository: PickHeroRepository,
    private readonly configService: ConfigService<EnvSchema>,
    private readonly backupService: BackupService,
  ) {}

  public async execute({
    userId,
    lobbyId,
    heroId,
  }: PickHeroInput & {
    userId: User["id"];
  }): Promise<void> {
    // TODO: the lobby fetched might lack of a lock
    const lobby = await this.repository.getLobbyById(lobbyId);
    this.assertCanPickHero(lobby, { userId, heroId });

    this.pickHero({ lobby, userId, heroId });

    await this.backupService.updateLobby({ lobby });
  }

  private assertCanPickHero(
    lobby: LobbyEntity | null,
    {
      userId,
      heroId,
    }: {
      userId: User["id"];
      heroId: Hero["id"];
    },
  ): asserts lobby is LobbyEntity {
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }

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

    const playerIdx = lobby.players.findIndex(
      (player) => player.userId === userId,
    );
    if (playerIdx < 0) {
      throw new ForbiddenException(
        "You must be in the lobby to pick this hero",
      );
    }
    const player = lobby.players[playerIdx]!;
    if (player.isReady) {
      throw new ForbiddenException("You cannot pick hero when you are ready");
    }

    const heroIdx = lobby.heroesAvailable.findIndex(({ id }) => id === heroId);
    if (heroIdx < 0) {
      throw new NotFoundException("Hero not found");
    }

    const hero = lobby.heroesAvailable[heroIdx]!;

    const isFreeHero =
      hero.pickedBy === undefined &&
      lobby.players.every((player) =>
        player.heroesSelected.every((heroSelected) => heroSelected !== heroId),
      );
    if (!isFreeHero) {
      throw new ForbiddenException("Hero already picked");
    }
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
    const heroIdx = lobby.heroesAvailable.findIndex(({ id }) => id === heroId);
    const hero = lobby.heroesAvailable[heroIdx]!;

    const playerIdx = lobby.players.findIndex(
      (player) => player.userId === userId,
    );
    const player = lobby.players[playerIdx]!;

    player.heroesSelected.push(heroId);
    hero.pickedBy = userId;
  }
}
