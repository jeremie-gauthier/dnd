import { LobbyEntity } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Hero } from "src/database/entities/hero.entity";

@Injectable()
export class RoleService {
  public getHeroOrThrow({
    lobby,
    heroId,
  }: {
    lobby: LobbyEntity;
    heroId: Hero["id"];
  }): LobbyEntity["heroesAvailable"][number] {
    const hero = lobby.heroesAvailable.find(({ id }) => id === heroId);
    if (!hero) {
      throw new NotFoundException("Hero not found in this lobby");
    }
    return hero;
  }

  public mustBePickableHero({
    lobby,
    heroId,
  }: {
    lobby: LobbyEntity;
    heroId: Hero["id"];
  }) {
    const hero = this.getHeroOrThrow({ lobby, heroId });
    const isPickable =
      hero.pickedBy === undefined &&
      lobby.players.every((player) =>
        player.heroesSelected.every((heroSelected) => heroSelected !== heroId),
      );
    if (!isPickable) {
      throw new ForbiddenException("Hero already picked");
    }
  }
}
