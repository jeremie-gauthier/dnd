import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

export const LoginButton = () => {
  const { t } = useTranslation(["common"]);
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${import.meta.env.VITE_AUTH0_LOGIN_REDIRECT_URI}${
          window.location.search
        }`,
      },
    });
  };

  return (
    <Button type="submit" onClick={handleLogin}>
      {t("login")}
    </Button>
  );
};
