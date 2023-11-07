var socket = io();
var userInput

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var typingMessage = document.getElementById('typing-message');


document.addEventListener('DOMContentLoaded', () => {
    userInput = window.prompt('Enter your name:');
    console.log(userInput);
});


input.addEventListener('input', () => {
    socket.emit('typing', userInput);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        const data = {
            message: input.value,
            name: userInput
        }
        socket.emit('message', data);
        input.value = '';
    }
});

socket.on('message', (data) => {

    if (Array.isArray(data)) {
        data.forEach(chat => {

            var newItem = document.createElement('li');
            newItem.textContent = chat.name + ": " + chat.message;
            messages.appendChild(newItem);
            window.scrollTo(0, document.body.scrollHeight);

        })
    } else {
        var newItem = document.createElement('li');
        newItem.textContent = data.name + ": " + data.message;
        messages.appendChild(newItem);
    }
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('typing', (userName) => {
    typingMessage.textContent = userName + ' is typing...';
    // temporizador para que no se quede permanentemente en la pantalla
    setTimeout(function () {
        typingMessage.textContent = '';
    }, 1000);
});