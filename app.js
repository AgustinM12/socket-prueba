import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { socketio } from "./helpers/socket.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);

app.use(cors());

app.use(express.static('public'));

socketio(server);

// Ruta
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
})

server.listen(4000, () => {
    console.log('Listening on port 4000');
})
