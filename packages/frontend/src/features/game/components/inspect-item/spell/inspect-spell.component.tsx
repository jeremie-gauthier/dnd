import { GameItem, sum } from "@dnd/shared";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Dice } from "../../dice/dice.component";
import { Perk } from "../../perk/perk.component";
import { getAttackTypeOrder } from "../utils/get-attack-type-order.util";
import { ManaCost } from "./mana-cost.component";

type Props = {
  spell: Extract<GameItem, { type: "Spell" }>;
};

export const InspectSpell = ({ spell }: Props) => {
  const { t } = useTranslation(["items"]);

  spell.attacks.sort((a, b) => getAttackTypeOrder(a) - getAttackTypeOrder(b));

  return (
    <div className="flex flex-col gap-3">
      <ManaCost manaCost={spell.manaCost} />

      {spell.attacks.map((attack) => {
        const attackDices = attack.dices.filter(
          ({ name }) => name !== "special",
        );
        const minDamage = sum(...attackDices.map(({ minValue }) => minValue));
        const maxDamage = sum(...attackDices.map(({ maxValue }) => maxValue));

        return (
          <Fragment key={attack.id}>
            <hr className="border-primary-600" />

            <div>
              <p>
                {t(attack.type)} | {t(attack.range)}
              </p>

              <span>{t("damageRange", { minDamage, maxDamage })}</span>

              <div className="flex flex-row">
                {attack.dices.map((dice, idx) => (
                  <Dice
                    key={`${spell.name}-${attack.type}-${dice.name}-${idx}`}
                    dice={dice}
                  />
                ))}
              </div>

              <div>
                {attack.perks.map((perk) => (
                  <Perk
                    key={`${spell.name}-${attack.type}-${perk.name}`}
                    perk={perk}
                  />
                ))}
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};
