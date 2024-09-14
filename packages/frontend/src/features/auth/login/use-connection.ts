import { useAuth0 } from "@auth0/auth0-react";
import { UserConnectionInput } from "@dnd/shared";
import { useRouter } from "@tanstack/react-router";

export const useConnection = () => {
  const router = useRouter();
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

  const tokenGetter = async () => {
    try {
      const token = await getAccessTokenSilently();
      return token;
    } catch (error) {
      await loginWithRedirect({
        appState: {
          // TODO?: url is as expected but app renders the "/" page
          returnTo: router.latestLocation.href,
        },
      });
    }
  };

  return async (body: UserConnectionInput): Promise<void> => {
    const token = await tokenGetter();
    await fetch("http://localhost:3000/user/private/connection", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };
};
