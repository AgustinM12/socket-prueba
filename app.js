import express from 'express';
import { createServer } from 'node:http';
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "*",
    },
})

io.on('connection', (socket) => {
    console.log(`Socket connected`);

    socket.on("message", data => {
        io.emit("message", data)
    })
})

server.listen(4000, () => {
    console.log('listening on port:4000');
})