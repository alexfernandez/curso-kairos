'use strict'

const http = require('http')

const server = http.createServer()

let total = 0

server.listen(8000)

function handleRequest(request, response) {
  total += 1
  response.end('<html><body><h1>My server</h1>'
    + '<body>Request for ' + request.url
    + ' number ' + total + '</body></html>')
}

server.on('listening', () => console.log('listening'))
server.on('request', handleRequest)
