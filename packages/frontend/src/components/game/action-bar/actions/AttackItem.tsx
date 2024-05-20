import { AttackRangeType, GameItem, sum } from "@dnd/shared";
import { useEffect } from "react";
import { TileClickedEvent } from "../../../../game-engine/events/tile-clicked.event";
import { classNames } from "../../../../utils/class-names.util";
import { Icon } from "../../../icon/Icon";
import { IconName } from "../../../icon/Icon.type";
import { useActionTabContext } from "../../context/ActionTab/useActionTabContext";
import { useGameContext } from "../../context/GameContext/useGameContext";

type Props = {
  item: GameItem;
  attack: GameItem["attacks"][number];
};

export const AttackItem = ({ item, attack }: Props) => {
  const { game, playerState, gameEventManager, heroPlaying, gameActions } =
    useGameContext();

  const { selectedAttack, clearSelectedAttack, selectAttack } =
    useActionTabContext();
  const isUsedToAttack = selectedAttack?.id === attack.id;

  useEffect(() => {
    const handleClick: EventListener = async (e) => {
      if (
        !canAttack ||
        !isUsedToAttack ||
        !heroPlaying ||
        playerState.currentAction !== "attack"
      )
        return;

      const { isometricCoord } = e as TileClickedEvent;

      const playableEntities = Object.values(game.playableEntities);
      const targetPlayableEntityId = playableEntities.find(
        ({ coord }) =>
          coord.row === isometricCoord.row &&
          coord.column === isometricCoord.column,
      )?.id;

      if (!targetPlayableEntityId) return;

      gameActions.attack({
        gameId: game.id,
        attackId: attack.id,
        attackerPlayableEntityId: heroPlaying.id,
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
    heroPlaying,
    playerState.toggleTo,
    playerState.currentAction,
  ]);

  const handleUseAttackItem = () => {
    if (!heroPlaying) return;

    if (isUsedToAttack) {
      playerState.toggleTo("idle");
      clearSelectedAttack();
    } else {
      playerState.toggleTo("attack");
      selectAttack(attack);
      gameEventManager.emitPreparingAttack({ game, heroPlaying, item, attack });
    }
  };

  const minDamage = sum(...attack.dices.map(({ minValue }) => minValue));
  const maxDamage = sum(...attack.dices.map(({ maxValue }) => maxValue));
  const mean =
    Math.round(
      (sum(...attack.dices.map(({ values }) => sum(...values))) /
        (attack.dices.length * 6)) *
        10,
    ) / 10;

  const canAttack =
    heroPlaying &&
    (heroPlaying.type === "hero" ||
      (heroPlaying.type === "enemy" &&
        !heroPlaying.actionsDoneThisTurn.some(
          ({ name }) => name === "attack",
        )));

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
          <p>{item.name}</p>
          <p>{attack.type} attack</p>
          <p>
            {minDamage}-{maxDamage}(~{mean}) dmg
          </p>
        </div>
      </button>
    </>
  );
};

const attackRangeIcon: Record<AttackRangeType, IconName> = {
  melee: "meleeAttack",
  long: "rangeAttack",
  versatile: "versatileAttack",
};
