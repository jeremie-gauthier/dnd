/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileImport } from './routes/profile'
import { Route as MenuImport } from './routes/menu'
import { Route as LoginImport } from './routes/login'
import { Route as GameTestImport } from './routes/game-test'
import { Route as WsImport } from './routes/_ws'
import { Route as WsMenuMultiplayerImport } from './routes/_ws.menu-multiplayer'
import { Route as WsLobbiesImport } from './routes/_ws.lobbies'
import { Route as WsCreateLobbyImport } from './routes/_ws.create-lobby'
import { Route as WsLobbyLobbyIdImport } from './routes/_ws.lobby.$lobbyId'
import { Route as WsGameGameIdImport } from './routes/_ws.game.$gameId'

// Create/Update Routes

const ProfileRoute = ProfileImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const MenuRoute = MenuImport.update({
  path: '/menu',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const GameTestRoute = GameTestImport.update({
  path: '/game-test',
  getParentRoute: () => rootRoute,
} as any)

const WsRoute = WsImport.update({
  id: '/_ws',
  getParentRoute: () => rootRoute,
} as any)

const WsMenuMultiplayerRoute = WsMenuMultiplayerImport.update({
  path: '/menu-multiplayer',
  getParentRoute: () => WsRoute,
} as any)

const WsLobbiesRoute = WsLobbiesImport.update({
  path: '/lobbies',
  getParentRoute: () => WsRoute,
} as any)

const WsCreateLobbyRoute = WsCreateLobbyImport.update({
  path: '/create-lobby',
  getParentRoute: () => WsRoute,
} as any)

const WsLobbyLobbyIdRoute = WsLobbyLobbyIdImport.update({
  path: '/lobby/$lobbyId',
  getParentRoute: () => WsRoute,
} as any)

const WsGameGameIdRoute = WsGameGameIdImport.update({
  path: '/game/$gameId',
  getParentRoute: () => WsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_ws': {
      id: '/_ws'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof WsImport
      parentRoute: typeof rootRoute
    }
    '/game-test': {
      id: '/game-test'
      path: '/game-test'
      fullPath: '/game-test'
      preLoaderRoute: typeof GameTestImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/menu': {
      id: '/menu'
      path: '/menu'
      fullPath: '/menu'
      preLoaderRoute: typeof MenuImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/_ws/create-lobby': {
      id: '/_ws/create-lobby'
      path: '/create-lobby'
      fullPath: '/create-lobby'
      preLoaderRoute: typeof WsCreateLobbyImport
      parentRoute: typeof WsImport
    }
    '/_ws/lobbies': {
      id: '/_ws/lobbies'
      path: '/lobbies'
      fullPath: '/lobbies'
      preLoaderRoute: typeof WsLobbiesImport
      parentRoute: typeof WsImport
    }
    '/_ws/menu-multiplayer': {
      id: '/_ws/menu-multiplayer'
      path: '/menu-multiplayer'
      fullPath: '/menu-multiplayer'
      preLoaderRoute: typeof WsMenuMultiplayerImport
      parentRoute: typeof WsImport
    }
    '/_ws/game/$gameId': {
      id: '/_ws/game/$gameId'
      path: '/game/$gameId'
      fullPath: '/game/$gameId'
      preLoaderRoute: typeof WsGameGameIdImport
      parentRoute: typeof WsImport
    }
    '/_ws/lobby/$lobbyId': {
      id: '/_ws/lobby/$lobbyId'
      path: '/lobby/$lobbyId'
      fullPath: '/lobby/$lobbyId'
      preLoaderRoute: typeof WsLobbyLobbyIdImport
      parentRoute: typeof WsImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  WsRoute: WsRoute.addChildren({
    WsCreateLobbyRoute,
    WsLobbiesRoute,
    WsMenuMultiplayerRoute,
    WsGameGameIdRoute,
    WsLobbyLobbyIdRoute,
  }),
  GameTestRoute,
  LoginRoute,
  MenuRoute,
  ProfileRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_ws",
        "/game-test",
        "/login",
        "/menu",
        "/profile"
      ]
    },
    "/_ws": {
      "filePath": "_ws.tsx",
      "children": [
        "/_ws/create-lobby",
        "/_ws/lobbies",
        "/_ws/menu-multiplayer",
        "/_ws/game/$gameId",
        "/_ws/lobby/$lobbyId"
      ]
    },
    "/game-test": {
      "filePath": "game-test.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/menu": {
      "filePath": "menu.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
    },
    "/_ws/create-lobby": {
      "filePath": "_ws.create-lobby.tsx",
      "parent": "/_ws"
    },
    "/_ws/lobbies": {
      "filePath": "_ws.lobbies.tsx",
      "parent": "/_ws"
    },
    "/_ws/menu-multiplayer": {
      "filePath": "_ws.menu-multiplayer.tsx",
      "parent": "/_ws"
    },
    "/_ws/game/$gameId": {
      "filePath": "_ws.game.$gameId.tsx",
      "parent": "/_ws"
    },
    "/_ws/lobby/$lobbyId": {
      "filePath": "_ws.lobby.$lobbyId.tsx",
      "parent": "/_ws"
    }
  }
}
ROUTE_MANIFEST_END */
