import { AttackResponseDto, AttackType } from "@/openapi/dnd-api";

export const getAttackTypeOrder = (attack: AttackResponseDto) => {
  if (attack.type === AttackType.regular) {
    return 0;
  }
  return 1;
};
