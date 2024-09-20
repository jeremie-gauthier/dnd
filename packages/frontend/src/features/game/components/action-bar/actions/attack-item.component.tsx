import { AttackRangeType, GameItem, sum } from "@dnd/shared";
import { useGameContext } from "@features/game/context/game.context";
import { Icon } from "@features/ui/icon/Icon";
import { classNames } from "@utils/class-names.util";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TileClickedEvent } from "../../../game-engine/events/tile-clicked.event";
import { useActionBarContext } from "../context/use-action-bar-context";

type Props = {
  item: GameItem;
  attack: GameItem["attacks"][number];
};

export const AttackItem = ({ item, attack }: Props) => {
  const { t } = useTranslation(["items"]);
  const { game, playerState, gameEventManager, entityPlaying, gameActions } =
    useGameContext();

  const { selectedAttack, clearSelectedAttack, selectAttack } =
    useActionBarContext();
  const isUsedToAttack = selectedAttack?.id === attack.id;

  useEffect(() => {
    const handleClick: EventListener = async (e) => {
      if (
        // !canAttack ||
        !isUsedToAttack ||
        !entityPlaying ||
        playerState.currentAction !== "attack"
      )
        return;

      const { isometricCoord } = e as TileClickedEvent;

      const playableEntities = Object.values(game.playableEntities);
      const targetPlayableEntityId = playableEntities.find(
        ({ coord, characteristic }) =>
          coord.row === isometricCoord.row &&
          coord.column === isometricCoord.column &&
          characteristic.healthPoints > 0,
      )?.id;

      if (!targetPlayableEntityId) return;

      gameActions.attack({
        gameId: game.id,
        attackId: attack.id,
        targetPlayableEntityId,
      });

      playerState.toggleTo("idle");
      clearSelectedAttack();
    };

    gameEventManager.addEventListener(TileClickedEvent.EventName, handleClick);

    return () =>
      gameEventManager.removeEventListener(
        TileClickedEvent.EventName,
        handleClick,
      );
  }, [
    clearSelectedAttack,
    isUsedToAttack,
    attack.id,
    game.id,
    game.playableEntities,
    gameActions.attack,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
    entityPlaying,
    playerState.toggleTo,
    playerState.currentAction,
  ]);

  const handleUseAttackItem = () => {
    if (!entityPlaying) return;

    if (isUsedToAttack) {
      playerState.toggleTo("idle");
      clearSelectedAttack();
    } else {
      playerState.toggleTo("attack");
      selectAttack(attack);
      gameEventManager.emitPreparingAttack({
        game,
        entityPlaying,
        item,
        attack,
      });
    }
  };

  if (!entityPlaying) {
    return null;
  }

  const minDamage = sum(...attack.dices.map(({ minValue }) => minValue));
  const maxDamage = sum(...attack.dices.map(({ maxValue }) => maxValue));
  const mean =
    Math.round(
      (sum(...attack.dices.map(({ values }) => sum(...values))) /
        (attack.dices.length * 6)) *
        10,
    ) / 10;

  const canBeCast =
    item.type !== "Spell" ||
    (item.type === "Spell" &&
      entityPlaying.faction === "hero" &&
      item.manaCost[entityPlaying.class] &&
      entityPlaying.characteristic.manaPoints >=
        item.manaCost[entityPlaying.class]!);

  const canAttack =
    entityPlaying &&
    entityPlaying.characteristic.actionPoints > 0 &&
    // TODO: re-enable this
    // (entityPlaying.faction === "hero" ||
    //   (entityPlaying.faction === "monster" &&
    //     !entityPlaying.actionsDoneThisTurn.some(
    //       ({ name }) => name === "attack",
    //     ))) &&
    canBeCast;

  return (
    <>
      <button
        type="button"
        onClick={handleUseAttackItem}
        disabled={!canAttack}
        className="disabled:grayscale"
      >
        <img
          src={item.imgUrl}
          alt={item.name}
          className={classNames(
            "rounded hover:contrast-125",
            isUsedToAttack ? "contrast-125" : "",
          )}
        />
        <div className="absolute top-1 right-1 h-8 w-8 rounded-full bg-orange-700 flex items-center justify-center">
          <Icon
            icon={attackRangeIcon[attack.range]}
            size="large"
            className="fill-white"
          />
        </div>
        <div className="absolute hidden inset-0 bg-black bg-opacity-35 text-white text-sm group-hover:flex flex-col p-1 items-start">
          <p>{t(item.name)}</p>
          <p>{t(attack.type)}</p>
          <p>
            {minDamage}-{maxDamage}(~{mean}) dmg
          </p>
        </div>
      </button>
    </>
  );
};

const attackRangeIcon: Record<
  AttackRangeType,
  Parameters<typeof Icon>[0]["icon"]
> = {
  melee: "meleeAttack",
  long: "rangeAttack",
  versatile: "versatileAttack",
};
