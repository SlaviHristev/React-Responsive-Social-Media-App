const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:5173"
    },
});

io.on("connection", (socket) => {
    console.log('A user connected');
})