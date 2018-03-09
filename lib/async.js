'use strict'

const async = require('async')
const https = require('https')

const url = 'https://raw.githubusercontent.com/alexfernandez/curso-devacademy/master/async/account-0$.json'

const tasks = []

for (let i = 1; i <= 5; i++) {
  tasks.push(callback => {
    getData(url.replace('$', i), callback)
  })
}
async.series(tasks, function(error, result) {
  console.log('e %s r %s', error, result)
  const total = result.reduce((a, b) => a + b)
  console.log('total %s', total)
})

function getData(url, callback) {
  https.get(url, (res) => {
    if (res.statusCode !== 200) {
      return callback(`Invalid status code ${res.statusCode}`);
    }
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => callback(null, JSON.parse(rawData).Debt));
  }).on('error', (e) => {
    return callback(`Got error: ${e.message}`);
  });
}
