---
name: UserForceLeftLobby
version: 0.0.1
summary: |
  Represents when a user was forced to left a lobby.
producers:
  - Lobby Module
consumers:
  - Lobby Module
  - User Module
---

### Details

This situation can happened when a socket disconnection signal is received.

<NodeGraph title="Consumer / Producer Diagram" />
