const {Server} = require('socket.io');//fetching the server from socket.io

const registerSocketServer = (server) =>{
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET", "POST"],
    }
});
io.on("connection", (socket)=> {
    console.log(`User Connected ${socket.id}`);
    });
}

module.exports = {registerSocketServer};