const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users = [];


const addUser = (userId, socketId) => {
  console.log("Adding user:", userId, socketId);
  !users.some((user) => String(user.userId) === String(userId)) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => String(user.socketId) !== String(socketId));
};

const getUser = (userId) => {
  return users.find((user) => String(user.userId) === String(userId));
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    console.log("User connected:", userId);
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, recieverId, text }) => {
    const user = getUser(recieverId);
    console.log(user);
    if (user) {
      const { socketId } = user;
      if (socketId) {
        io.to(socketId).emit("getMessage", {
          senderId,
          text,
        });
        io.emit("newMessage", {
          senderId,
          recieverId,
          text,
        });
      } else {
        console.error(`Socket ID not found for user: ${recieverId}`);
      }
    } else {
      console.error(`User not found: ${recieverId}`);
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});