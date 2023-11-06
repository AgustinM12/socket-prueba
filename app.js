import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "*",
    },
})

const messageList = []

//configuracion
io.on('connection', (socket) => {
    //al conectarse
    console.log(socket.id, `New socket connected`);

    //al desconectar
    socket.on("disconnect", () => {
        console.log(socket.id, `Socket disconnected`);
    })

    // Emitir mensajes existentes a un nuevo usuario
    socket.emit("message", messageList);

    //emitir mensajes
    socket.on("message", data => {
        //guarda los mensajes en el array
        messageList.push(data);

        io.emit("message", data)
        //brodcast hace que el mensaje no se envie al remitente
        //socket.broadcast.emit("message", data)

        console.log("message:", data);
        console.log("Lista", messageList);
    })
})

// Ruta
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

server.listen(4000, () => {
    console.log('Listening on port 4000');
})
