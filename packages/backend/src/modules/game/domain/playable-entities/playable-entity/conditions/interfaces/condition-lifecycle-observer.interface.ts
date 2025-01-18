export interface ConditionLifecycleObserver {
  onStartOfTurn(): void;
  onEndOfTurn(): void;
  onBeforeOutgoingWeaponAttack({ sumResult }: { sumResult: number }): void;
  onBeforeIncomingAttack(): void;
  onBeforeTrapOrChestTrapTriggered(): void;
}
