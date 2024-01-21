---
name: UserForceLeftLobby
version: 0.0.1
summary: |
  Represents when a user was forced to left a lobby.
producers:
  - Handle WS Disconnection UC
consumers:
  - Track User Accross Lobbies Listener
  - Room Manager Listener
  - Lobbies Changes Listener
  - Lobby Cleaner Listener
---

### Details

This situation can happened when a socket disconnection signal is received.

<NodeGraph title="Consumer / Producer Diagram" />
