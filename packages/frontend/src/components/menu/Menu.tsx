import { Link } from "@tanstack/react-router";

export const Menu = () => {
  return (
    <div>
      <h2>Menu</h2>

      <Link to="/menu/solo">Solo player</Link>

      <br />

      <Link to="/menu-multiplayer">Multiplayer</Link>
    </div>
  );
};
