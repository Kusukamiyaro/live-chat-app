const express = require("express");
const dontenv = require("dotenv");
const { default: mongoose, connect } = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

const app = express();
dontenv.config();
app.get("/", (req, res) => {
  res.send("Root api is running");
});
app.use(express.json());
const mongoUri = process.env.MONGOURI;
const connectionDB = async () => {
  try {
    const connect = mongoose.connect(mongoUri);

    console.log(connect, "coonected to bd");
  } catch (erroe) {
    console.log("=====Not  connected=======", erroe.messsage);
  }
  //   console.log("====================================");
};
connectionDB();
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

const port = process.env.PORT || 4201;

const server = app.listen(port, () => {
  console.log(`server is running on port  ${port}`);
});
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
});
io.on("connection", (socket) => {
  socket.on("setup", (user) => {
    socket.join(user.data._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
  });
  socket.on("new message", (newmessage) => {
    var chat = newmessage.chat;
    if (!chat.users) {
      return console.log("chat user is not defined");
    }
    chat.users.forEach((user) => {
      if (user._id == newmessage.sender._id) return;
      socket.in(user._id).emit("message recieved", newmessage);
    });
  });
});
