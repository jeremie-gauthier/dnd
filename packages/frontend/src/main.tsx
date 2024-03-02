import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { queryClient } from "./config/fetcher";
import { AppRouter } from "./router/AppRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    useRefreshTokens={true}
    cacheLocation="localstorage"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "http://localhost:3000/",
      scope: "profile email read:current_user offline_access",
    }}
  >
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </Auth0Provider>,
);
