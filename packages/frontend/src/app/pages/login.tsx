import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "@features/users/login/login-button.component";
import { useConnection } from "@features/users/login/use-connection";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import * as React from "react";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    if (context.auth?.isAuthenticated) {
      return redirect({ to: "/lobbies" });
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
  const { isAuthenticated, user } = useAuth0();
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

  return (
    <div>
      <div>You must log in!</div>
      <LoginButton />
    </div>
  );
}
