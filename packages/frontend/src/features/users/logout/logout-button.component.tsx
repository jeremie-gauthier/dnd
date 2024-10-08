import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  afterLogout: () => void;
};

export const LogoutButton = ({ afterLogout }: Props) => {
  const { logout } = useAuth0();

  const handleLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: import.meta.env.VITE_AUTH0_LOGOUT_REDIRECT_URI,
      },
    });
    afterLogout();
  };

  return (
    <button type="submit" onClick={handleLogout}>
      Log Out
    </button>
  );
};
