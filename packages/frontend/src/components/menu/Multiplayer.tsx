import { Link } from "@tanstack/react-router";

export const MenuMultiplayer = () => {
  return (
    <div>
      <h2>Multiplayer</h2>

      <Link to="/create-lobby">Host a game</Link>

      <br />

      <Link to="/lobbies">Join a game</Link>
    </div>
  );
};
