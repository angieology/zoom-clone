const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");
const { PeerServer } = require("peer");

const peerServer = PeerServer({ port: 9000, path: "/peer" });

app.set("view engine", "ejs");
app.use(express.static("public")); // serve files

app.get("/", (req, res) => {
  // create a new room and route them
  // * session *
  res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    console.log(roomId, userId);
    socket.join(roomId);
    // broadcast: notify everyone in room i've arrived, (but don't send it back to me.)
    socket.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId);
    });
  });
});

server.listen(process.env.PORT || 3000);
