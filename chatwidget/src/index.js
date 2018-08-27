const socket = require('socket.io-client')('http://localhost:3001')
const $ = require('jquery')
 
let html = document.createElement('div')
let element = createAndAppendElement('section', 'chat', html)
createAndAppendElement('h1', 'motd', element)
createAndAppendElement('input', 'message', html)
createAndAppendElement('button', 'send', html, 'Send')  

let send = $(html.querySelector('#send'))
let message = $(html.querySelector('#message'))
let chat = $(html.querySelector('#chat'))
let motd = $(html.querySelector('#motd'))

socket.on('motd', (data) => {
    motd.text(data)
})

socket.on('user connected', (data) => {
    chat.append("<p>" + data + "</p>")
})

socket.on('user disconnected', (data) => {
    chat.append("<p>" + data + "</p>")
})

socket.on('new message', (data) => {
    chat.append("<p>" + data.sender + ": " + data.message + "</p>")
})

send.click(() => {
    socket.emit('new message', message.val())
})

function createAndAppendElement(type, id, parent, value) {
    let element = document.createElement(type)
    parent.appendChild(element)
    $(element).attr('id', id)
    if (value) $(element).html(value)
    return element
}

module.exports = () => {
    return {
        appendTo: (e) => { e.appendChild(html) }
    }
}