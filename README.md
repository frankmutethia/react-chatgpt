The project is still in progress, the OpenAI API key is depreciated.

Chatgpt React Project:
Setup
Client-side- React
Server - Express with Server.io
OpenAi API.

1. Install node.
2. Setup React project.
3. Icons installation - “npm install react-icons --save”

User icons were imported from React icons.
After the user interface, we proceed to the Express server with Socket.IO

Express Server with Socket.IO
Client- React App
Server- Express Application with Socket.IO server. The server will save messages and send requests to the OpenAI API, with user requests. All messages are stored in the server store.
OpenAI API- AI generating response. As soon as the response is found it is returned back to the server.

SocketIO - event-driven library for real-time web applications. It enables low latency, bidirectional, and event-based communication from the client to the server.

We will create our own express server.

Commands:(Server folder terminal):
npm init
npm install --save cors dotenv express openai socket.io uuid

Testing Connection from Postman
1. Run the server from the terminal, using the command: “node index.js”.
2. Start the postman application, open new file, websocket, socketio.
3. Enter: “http://localhost:5000” (as per the run localhost from your server in the terminal).
4. You will observe a connection alert on postman.

Connecting with the Socketio server from the Client Side
Install socketio in the application, using the terminal.
Check the user connectivity confirmation from the server.
Go to the developer tools console section to check the connectivity also:
Console
Network => ws

Sending messages to the Server
1. Install the uuid: “npm install -- save uuid”
2. Run the application again and import: “import { v4 as uuid } from "uuid"; ”. In the necessary file.
3. We have to add Redux for state management. Run: “npm install -- save react-redux @reduxjs/toolkit” 
4. In order to run the server. Open the server folder through the terminal, then run “node index.js”.

Working with the OpenAI Platform
1. Install the OpenAI dependency: (check out the openai website for more info)
“pip install openai”
“npm install openai@^4.0.0”
2. Add necessary keys to your .env:(these are my personal keys)
