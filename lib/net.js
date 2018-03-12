'use strict';

const net = require('net')

net.createServer(handleRequest).listen(1702)

function handleRequest(socket) {
  socket.write('¿Hola?\r\n')
  socket.on('data', data => {
    if (data === 'hello\r\n') {
      return socket.end('world\r\n')
    }
    return socket.write('ERROR\r\n')
  })
}
