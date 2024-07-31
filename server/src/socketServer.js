const { Server } = require("socket.io");
const { v4: uuid } = require("uuid");

let sessions = {};

const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);

    socket.on("session-history", (data) => {
      sessionHistoryHandler(socket, data);
    });

    socket.on("conversation-message", (data) => {
      conversationMessageHandler(socket, data);
    });

    socket.on("conversation-delete", (data) => {
      conversationDeleteHandler(socket, data);
    });
  });
};

const sessionHistoryHandler = (socket, data) => {
  const { sessionId } = data;

  if (sessions[sessionId]) {
    // send existing session data back to user

    socket.emit("session-details", {
      sessionId,
      conversations: sessions[sessionId],
    });
  } else {
    const newSessionId = uuid();

    sessions[newSessionId] = [];

    const sessionDetails = {
      sessionId: newSessionId,
      conversations: [],
    };

    socket.emit("session-details", sessionDetails);
  }
};

const conversationMessageHandler = (socket, data) => {
  const { sessionId, message, conversationId } = data;

  if (sessions[sessionId]) {
    const aiMessage = {
      content: "Hello here is AI",
      id: uuid(),
      aiMessage: true,
    };

    const conversation = sessions[sessionId].find(
      (c) => c.id === conversationId
    );

    if (!conversation) {
      sessions[sessionId].push({
        id: conversationId,
        messages: [message, aiMessage],
      });
    }

    if (conversation) {
      conversation.messages.push(message, aiMessage);
    }

    const updatedConversation = sessions[sessionId].find(
      (c) => c.id === conversationId
    );

    socket.emit("conversation-details", updatedConversation);
  }
};

const conversationDeleteHandler = (_, data) => {
  const { sessionId } = data;

  if (sessions[sessionId]) {
    sessions[sessionId] = [];
  }
};

module.exports = { registerSocketServer };



// const {Server} = require('socket.io');//fetching the server from socket.io
// const {v4: uuid} = require('uuid');

// let sessions = {};


// const registerSocketServer = (server) =>{
// const io = new Server(server,{
//     cors:{
//         origin:"*",
//         methods:["GET", "POST"],
//     }
// });
// io.on("connection", (socket)=> {
//     console.log(`User Connected ${socket.id}`);
     
//     socket.on("session-history", (data) => {
//     sessionHistoryHandler(socket, data);
//     });

//     socket.on("conversation-message", (data) => {
//     conversationMessageHandler(socket, data);
//     })
//     });
// }


// const sessionHistoryHandler = (socket, data) => {
// const { sessionId } = data;

// if(sessions[sessionId]){
//   //send  existing session data back to user
//   socket.emit("session-details", {
//     sessionId,
//     conversations: sessions[sessionsId],
//   });
// } else{
//     const newSessionId = uuid();

//     sessions[newSessionId] = []
//     //define session details that will be sent back to the user
//     const sessionDetails = {
//     sessionId: newSessionId,
//     conversations: [],
//     };

//     socket.emit("session-details", sessionDetails);
// }

// }


// const conversationMessageHandler = (socket, data) =>{
//     console.log("message came from client side");
// console.log(data);
// const {sessionid, message, conversationId } = data;
// if (sessions[sessionId]) {
//     const aiMessage = {
//         content: "Hello here is AI",
//         id: uuid(),
//         aiMessage: true,
//       };
  
//       const conversation = sessions[sessionId].find(
//         (c) => c.id === conversationId
//       );
// //if conversation does not exist
// if(!conversation){
//     sessions[sessionId].push({//new conversation has been created here
//     id: conversationId,
//     messages: [message, aiMessage],
//     });
// }


// //if conversation does exist
// if(!conversation){
// //messages are the array, we are also pushing this message onto the array
// conversation.messages.push(message,aiMessage);
// }

// const updatedConversation = sessions[sessionId].find
// (c => c.id === conversationId
// );

// socket.emit("conversation-details", updatedConversation);
// }
// };
// module.exports = {registerSocketServer};