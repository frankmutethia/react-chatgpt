
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
    socket.on("conversation-message", (data) => {
    conversationMessageHandler(socket, data)
    })
    });
}

const conversationMessageHandler = (socket, data) =>{
    console.log("message came from client side");
console.log(data);
}
module.exports = {registerSocketServer};