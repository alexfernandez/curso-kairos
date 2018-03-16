'use strict'

const net = require('net')

const key = 'key'
const notFound = 'NOT_FOUND'
const value = 'VALUE'

class Client {
  constructor(host, port) {
    this.host = host
    this.port = port
  }

  connect(callback) {
    this.socket = net.connect(this.port, this.host, callback)
  }

  get(key, callback) {
    this.socket.write('get ' + key + '\r\n')
    this.socket.once('data', result => {
      console.log('ya')
      if (result == notFound) {
        return callback(null, null)
      }
      const value = String(result).split(' ').slice(1).join(' ')
      return callback(null, value)
    })
  }
  set(key, value, callback) {
    this.socket.write('set ' + key + ' ' + value + '\r\n')
    this.socket.once('data', callback)
  }
  delete(key, callback) {
    this.socket.write('delete ' + key + '\r\n')
    this.socket.once('data', callback)
  }
}

const client = new Client('127.0.0.1', 11311)
client.connect(() => {
  console.log('hola')
  client.get(key, (error, result) => {
    console.log('e %s r %s', error, result)
  })
})

