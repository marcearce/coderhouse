import express from "express";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import sanitizeHtml from "sanitize-html";
import Users from "./controllers/Users.js";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
app.use(express.static(__dirname + "/public"));

const io = new Server(server);

//const users = [];
const users = new Users();
const messages = [];
const sanitizerOptions = {
  allowedTags: [],
  allowedAttributes: [],
};

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => console.log("Client disconnected"));
  socket.on("newUser", (user) => {
    if (!users.getUser(user)) {
      //users.addUser(socket.id, user);
      socket.broadcast.emit("newUser", {
        users: user,
        //messages: messages,
      });
    }
  });

  socket.on("chatMessageFromBrowser", (message) => {
    //console.log(message);
    const msg = sanitizeHtml(message.message, sanitizerOptions);
    const user = sanitizeHtml(message.user, sanitizerOptions);
    //users[socket.id] = user;
    //users.push(user);
    // if (users.getUser(users.createHash(user))) {
    //   console.log("User already exists");
    // } else {
    //   users.addUser(user);
    //   console.log("User added");
    // }
    //users.addUser(socket.id, user);
    messages.push({
      user,
      message: msg,
    });

    if (msg.length > 0) {
      io.emit("chatMessageFromServer", {
        user,
        msg,
        //ononline: users.countUsers(),
      });
      //   console.log(typeof users.createHash(user));
      //   console.log(typeof users.getUsers());
      console.log(users.getUsers());
      //console.log(users.getUser(user));
      //console.log(users.countUsers());

      //fead19e2670a3b62fb96c8966f19198f3a021de3c3122a3038ea8887a87537c4
      //console.log(users);
      // console.log(users.)
      //console.log(msg);
    }
  });
});
