import { Route as rootRoute } from "./routes/__root"
import { Route as LoginRoute } from "./routes/login"
import { Route as AuthRoute } from "./routes/_auth"
import { Route as AuthProfileRoute } from "./routes/_auth.profile"

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_auth": {
      parentRoute: typeof rootRoute
    }
    "/login": {
      parentRoute: typeof rootRoute
    }
    "/_auth/profile": {
      parentRoute: typeof AuthRoute
    }
  }
}

Object.assign(AuthRoute.options, {
  id: "/auth",
  getParentRoute: () => rootRoute,
})

Object.assign(LoginRoute.options, {
  path: "/login",
  getParentRoute: () => rootRoute,
})

Object.assign(AuthProfileRoute.options, {
  path: "/profile",
  getParentRoute: () => AuthRoute,
})

export const routeTree = rootRoute.addChildren([
  AuthRoute.addChildren([AuthProfileRoute]),
  LoginRoute,
])
