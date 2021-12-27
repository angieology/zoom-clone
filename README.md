# Zoom Clone Video chat app with Socket.io and PeerJS

tutorial: https://www.youtube.com/watch?v=DvlyzDZDEq4&t=867s&ab_channel=WebDevSimplified

> Cannot be deployed to Heroku without SSL https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#privacy_and_security

## Setup

1. Clone repository and install dependencies

```
npm i
npm start
```

2. Navigate to http://localhost:3000, should be immediately redirected to a new room.

3. In another browser window, navigate to the exact from from the first window.

On connecting to a new user, will see the video update in both screens. When disconnecting the video disappears.

![alt text](/assets/screenshot.png)

# [SocketIO](https://socket.io/docs/v4/)

- Slight wrapper around WebSocket
- WebSocket is a internet protocol that allows duplex communication.

## Socket on server

- [emitting](https://socket.io/docs/v4/emitting-events/#basic-emit) and [listening](https://socket.io/docs/v4/listening-to-events/) to events
- [broadcasting](https://socket.io/docs/v4/broadcasting-events/#to-all-connected-clients-except-the-sender) events
- [joining and leaving rooms](https://socket.io/docs/v4/rooms/#joining-and-leaving)
- You can broadcast to a specific room like so:
  ```
  io.on("connection", (socket) => {
     socket.to("some room").emit("some event");
  });
  ```

#### Broadcasting

![broadcasting](/assets/broadcasting.png)

#### Broadcasting Multiple Servers (not used in this project)

![broadcasting redis](/assets/broadcasting-redis.png)

## Socket on client

- Client can emit or listen to events.
  ![socket events](/assets/socket-events.png)

# [PeerJS](https://peerjs.com/docs.html#start)

> warning: some tricky networking bits ahead

- PeerJS is a wrapper around WebRTC
- WebRTC lets us stream P2P media (video and audio)
- you can stream between users directly, you just need a separate server to make the initial connection.
- this is called [signaling](https://webrtc.org/getting-started/peer-connections#signaling)
- PeerJS simplifies setting up the extra server configs by providing a generic one on their cloud.
- You can also set up your own [PeerJS server](https://github.com/peers/peerjs-server)

![webrtc signalling](/assets/webrtc-signal.png)

> Another complication: media can only be streamed over HTTPS (for security). Investigate Heroku setup

## Socket Video Flow

![socket video flow](/assets/socket-video-flow.png)
