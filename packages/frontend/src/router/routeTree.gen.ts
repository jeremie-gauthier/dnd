import { Route as rootRoute } from "./routes/__root"
import { Route as ProfileRoute } from "./routes/profile"
import { Route as MenuRoute } from "./routes/menu"
import { Route as LoginRoute } from "./routes/login"
import { Route as WsRoute } from "./routes/_ws"
import { Route as WsMenuMultiplayerRoute } from "./routes/_ws.menu-multiplayer"
import { Route as WsLobbiesRoute } from "./routes/_ws.lobbies"
import { Route as WsCreateLobbyRoute } from "./routes/_ws.create-lobby"
import { Route as WsLobbyLobbyIdRoute } from "./routes/_ws.lobby.$lobbyId"

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_ws": {
      parentRoute: typeof rootRoute
    }
    "/login": {
      parentRoute: typeof rootRoute
    }
    "/menu": {
      parentRoute: typeof rootRoute
    }
    "/profile": {
      parentRoute: typeof rootRoute
    }
    "/_ws/create-lobby": {
      parentRoute: typeof WsRoute
    }
    "/_ws/lobbies": {
      parentRoute: typeof WsRoute
    }
    "/_ws/menu-multiplayer": {
      parentRoute: typeof WsRoute
    }
    "/_ws/lobby/$lobbyId": {
      parentRoute: typeof WsRoute
    }
  }
}

Object.assign(WsRoute.options, {
  id: "/ws",
  getParentRoute: () => rootRoute,
})

Object.assign(LoginRoute.options, {
  path: "/login",
  getParentRoute: () => rootRoute,
})

Object.assign(MenuRoute.options, {
  path: "/menu",
  getParentRoute: () => rootRoute,
})

Object.assign(ProfileRoute.options, {
  path: "/profile",
  getParentRoute: () => rootRoute,
})

Object.assign(WsCreateLobbyRoute.options, {
  path: "/create-lobby",
  getParentRoute: () => WsRoute,
})

Object.assign(WsLobbiesRoute.options, {
  path: "/lobbies",
  getParentRoute: () => WsRoute,
})

Object.assign(WsMenuMultiplayerRoute.options, {
  path: "/menu-multiplayer",
  getParentRoute: () => WsRoute,
})

Object.assign(WsLobbyLobbyIdRoute.options, {
  path: "/lobby/$lobbyId",
  getParentRoute: () => WsRoute,
})

export const routeTree = rootRoute.addChildren([
  WsRoute.addChildren([
    WsCreateLobbyRoute,
    WsLobbiesRoute,
    WsMenuMultiplayerRoute,
    WsLobbyLobbyIdRoute,
  ]),
  LoginRoute,
  MenuRoute,
  ProfileRoute,
])
