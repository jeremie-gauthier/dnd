import { useAuth0 } from "@auth0/auth0-react";
import { LinkButton } from "@features/ui/button/link-button";
import { LoginButton } from "@features/users/login/login-button.component";
import { useConnection } from "@features/users/login/use-connection";
import { LogoutButton } from "@features/users/logout/logout-button.component";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import * as React from "react";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    if (context.auth?.isAuthenticated) {
      return redirect({ to: "/profile" });
    }
  },
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
}).update({
  component: LoginComponent,
});

function LoginComponent() {
  const router = useRouter();
  const search = Route.useSearch();
  const { isAuthenticated, user, logout } = useAuth0();
  const connection = useConnection();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useLayoutEffect(() => {
    if (isAuthenticated && user) {
      router.invalidate();
      connection({
        avatarUrl: user.picture ?? "",
        username: user.name ?? "",
      });

      if (search.redirect) {
        router.history.push(search.redirect);
      }
    }
  }, [isAuthenticated]);

  return isAuthenticated && user ? (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>

      <LogoutButton
        afterLogout={() => {
          logout();
          router.invalidate();
        }}
      />

      <LinkButton to="/menu-multiplayer">Menu multiplayer</LinkButton>
      <LinkButton to="/profile">Mon profil</LinkButton>
    </div>
  ) : (
    <div>
      <div>You must log in!</div>
      <LoginButton />
    </div>
  );
}
