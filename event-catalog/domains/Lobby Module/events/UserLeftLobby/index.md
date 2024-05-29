---
name: UserLeftLobby
version: 0.0.1
summary: |
  Represents when a user has left a lobby.
producers:
  - Seat Manager Service
consumers:
  - Track User Accross Lobbies Listener
  - Lobby Publisher Gateway
  - Lobby Cleaner Listener
---

<NodeGraph title="Consumer / Producer Diagram" />
