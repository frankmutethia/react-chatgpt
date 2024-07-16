const {Server} = require('socketio');

const registerSocketServer = (server) =>{
const io = new Server(server, {
    cors:{
        origin:"*",
        methods:["GET", "POST"],
    }
});

io.on("connection", (socket)=> {
console.log(`User Connected ${socket.id}`);
});
};