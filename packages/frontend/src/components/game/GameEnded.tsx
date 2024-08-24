type Props = {
  gameConditionsStatus: "victory" | "defeat";
};

export const GameEnded = ({ gameConditionsStatus }: Props) => {
  const isVictorious = gameConditionsStatus === "victory";

  return (
    <div>
      <p>{isVictorious ? "Victoire" : "Défaite"}</p>
    </div>
  );
};
