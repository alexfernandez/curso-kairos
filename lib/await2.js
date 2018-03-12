'use strict'

const async = require('async')
const https = require('https')
const request = require('basic-request')

const url = 'https://raw.githubusercontent.com/alexfernandez/curso-devacademy/master/async/account-0$.json'

const promises = []

for (let i = 1; i <= 5; i++) {
  promises.push(getData(url.replace('$', i)))
}
Promise.all(promises)
  .then(result => {
    console.log('r %s', result)
    const total = result.reduce((a, b) => a + b)
    console.log('total %s', total)
  })
  .catch(error => console.error)

function getData(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (error, result) => {
      if (error) return reject(error)
      return resolve(JSON.parse(result).Debt)
    })
  })
}
