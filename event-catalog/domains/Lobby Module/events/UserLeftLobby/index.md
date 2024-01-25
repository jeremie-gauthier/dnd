---
name: UserLeftLobby
version: 0.0.1
summary: |
  Represents when a user has left a lobby.
producers:
  - Leave Lobby UC
consumers:
  - Track User Accross Lobbies Listener
  - Room Manager Listener
  - Lobbies Changes Listener
  - Lobby Cleaner Listener
---

<NodeGraph title="Consumer / Producer Diagram" />
