const {Server} = require('socket.io');//fetching the server from socket.io
const {v4: uuid} = require('uuid');

let sessions = {};


const registerSocketServer = (server) =>{
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET", "POST"],
    }
});
io.on("connection", (socket)=> {
    console.log(`User Connected ${socket.id}`);
     
    socket.on("session-history", (data) => {
    sessionHistoryHandler(socket, data);
    });

    socket.on("conversation-message", (data) => {
    conversationMessageHandler(socket, data);
    })
    });
}


const sessionHistoryHandler = (socket, data) => {
const { sessionId } = data;

if(sessions[sessionId]){
  //send  existing session data back to user
  socket.emit("session-details", {
    sessionId,
    conversations: sessions[sessionsId],
  });
} else{
    const newSessionId = uuid();

    sessions[newSessionId] = []
    //define session details that will be sent back to the user
    const sessionDetails = {
    sessionId: newSessionId,
    conversations: [],
    };

    socket.emit("session-details", sessionDetails);
}

}


const conversationMessageHandler = (socket, data) =>{
    console.log("message came from client side");
console.log(data);
}
module.exports = {registerSocketServer};