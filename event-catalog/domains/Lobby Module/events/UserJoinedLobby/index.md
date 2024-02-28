---
name: UserJoinedLobby
version: 0.0.1
summary: |
  Represents when a user has join a lobby.
producers:
  - Create Lobby UC
  - Join Lobby UC
consumers:
  - Track User Accross Lobbies Listener
  - Room Manager Listener
  - Lobby Changed Listener
  - Lobbies Changes Listener
---

<NodeGraph title="Consumer / Producer Diagram" />
