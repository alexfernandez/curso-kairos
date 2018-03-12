'use strict'

const async = require('async')
const https = require('https')
const request = require('basic-request')

const url = 'https://raw.githubusercontent.com/alexfernandez/curso-devacademy/master/async/account-0$.json'

const tasks = []

for (let i = 1; i <= 5; i++) {
  tasks.push(callback => {
    getData(url.replace('$', i), callback)
  })
}
async.parallel(tasks, function(error, result) {
  console.log('e %s r %s', error, result)
  const total = result.reduce((a, b) => a + b)
  console.log('total %s', total)
})

function getData(url, callback) {
  request.get(url, (error, result) => {
    if (error) return callback(error)
    return callback(null, JSON.parse(result).Debt)
  })
}
