import { Server } from "socket.io";

export async function socketio(server) {

    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    })

    const messageList = []
    const typingUsers = new Set();

    //configuracion
    io.on('connection', (socket) => {
        //al conectarse
        console.log(socket.id, `New socket connected`);


        // Manejar evento de escritura
        socket.on('typing', (userName) => {
            socket.broadcast.emit("typing", userName)

            // Agrega el usuario a la lista de usuarios escribiendo
            // typingUsers.add(userName);

            // Emite la lista de usuarios escribiendo a todos los clientes
            // io.emit('typing', Array.from(typingUsers));
        });


        // Manejar evento dejar de escritura
        // socket.on('stopTyping', (userName) => {
        //     // Elimina el usuario de la lista de usuarios escribiendo
        //     typingUsers.delete(userName);

        //     // Emite la lista actualizada de usuarios escribiendo a todos los clientes
        //     io.emit('typing', Array.from(typingUsers));
        // });


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
} 