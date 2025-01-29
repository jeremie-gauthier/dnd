import { WeaponResponseDto } from "@/openapi/dnd-api";
import { sum } from "@dnd/shared";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Dice } from "../../dice/dice.component";
import { Perk } from "../../perk/perk.component";
import { getAttackTypeOrder } from "../utils/get-attack-type-order.util";

type Props = {
  weapon: WeaponResponseDto;
};

export const InspectWeapon = ({ weapon }: Props) => {
  const { t } = useTranslation(["items"]);

  weapon.attacks.sort((a, b) => getAttackTypeOrder(a) - getAttackTypeOrder(b));

  return (
    <div className="flex flex-col gap-3">
      {weapon.attacks.map((attack, idx) => {
        const attackDices = attack.dices.filter(
          ({ name }) => name !== "special",
        );
        const minDamage = sum(...attackDices.map(({ minValue }) => minValue));
        const maxDamage = sum(...attackDices.map(({ maxValue }) => maxValue));

        return (
          <Fragment key={attack.id}>
            {idx > 0 ? <hr className="border-slate-500" /> : null}

            <div>
              <p>
                {t(attack.type)} | {t(attack.range)}
              </p>

              <span>{t("damageRange", { minDamage, maxDamage })}</span>

              <div className="flex flex-row">
                {attack.dices.map((dice, idx) => (
                  <Dice
                    key={`${weapon.name}-${attack.type}-${dice.name}-${idx}`}
                    dice={dice}
                  />
                ))}
              </div>

              {attack.perks.length > 0 ? (
                <div className="mt-2">
                  {attack.perks.map((perk) => (
                    <Perk
                      key={`${weapon.name}-${attack.type}-${perk.name}`}
                      perk={perk}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};
