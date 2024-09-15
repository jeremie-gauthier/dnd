import gameMaster from "@assets/classes/game_master.webp";

export const GameMasterCard = () => {
  return (
    <>
      <img src={gameMaster} alt="" width={200} className="h-64" />
      <h3 className="font-medium">Game Master</h3>
      <div className="flex gap-2">
        <p>Control all monsters</p>
      </div>
    </>
  );
};
