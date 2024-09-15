import { LinkButton } from "@features/ui/button/link-button";

export const ChooseMultiplayerAction = () => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="font-semibold text-xl text-center">Multiplayer</h1>

      <div className="flex flex-col space-y-4">
        <LinkButton to="/create-lobby">Host a game</LinkButton>
        <LinkButton to="/lobbies">Join a game</LinkButton>
      </div>
    </div>
  );
};
