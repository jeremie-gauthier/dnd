import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const LogoutButton = () => {
  const { logout } = useAuth0();
  const router = useRouter();
  const { t } = useTranslation(["common"]);

  const handleLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: import.meta.env.VITE_AUTH0_LOGOUT_REDIRECT_URI,
      },
    });
    router.invalidate();
  };

  return (
    <Button variant="link" type="submit" onClick={handleLogout}>
      {t("logout")}
    </Button>
  );
};
