import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "@features/users/login/login-button.component";
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useLayoutEffect(() => {
    if (isAuthenticated && user) {
      router.invalidate();

      if (search.redirect) {
        router.history.push(search.redirect);
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <LoginButton />
    </div>
  );
}
