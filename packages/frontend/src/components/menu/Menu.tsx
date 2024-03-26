import { LinkButton } from "../shared/button/LinkButton";

export const Menu = () => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="font-semibold text-xl text-center">Menu</h1>

      <div className="flex flex-col space-y-4">
        <LinkButton to="/menu/solo">Solo player</LinkButton>
        <LinkButton to="/menu-multiplayer">Multiplayer</LinkButton>
      </div>
    </div>
  );
};
