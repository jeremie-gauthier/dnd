import "@config/i18n";
import { Auth0Provider } from "@auth0/auth0-react";
import { queryClient } from "@lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export const AppProvider = ({ children }: Props) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_LOGIN_REDIRECT_URI,
        audience: "http://localhost:3000/",
        scope: "profile email read:current_user offline_access",
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Auth0Provider>
  );
};
