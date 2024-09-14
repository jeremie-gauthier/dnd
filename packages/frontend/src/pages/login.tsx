import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton, useConnection } from "@features/auth";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import * as React from "react";
import { z } from "zod";

export const Route = createFileRoute("/login")({
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
      console.log("useLayoutEffect", isAuthenticated, user);
      router.invalidate();
      connection({
        avatarUrl: user.picture ?? "",
        username: user.name ?? "",
      });

      if (search.redirect) {
        router.history.push(search.redirect);
      }
    }
  }, [isAuthenticated, user, search.redirect]);

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
    </div>
  ) : (
    <div>
      <div>You must log in!</div>
      <LoginButton />
    </div>
  );
}
