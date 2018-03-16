'use strict';

const testing = require('testing')

function getFiveAsync(callback) {
  setImmediate(function() {
    callback(null, 5);
  });
}

function testFiveAsync(callback) {
  getFiveAsync((error, result) => {
    testing.check(error, 'Could not get five async', callback)
    testing.equals(result, 5, 'Invalid five', callback)
    testing.success(callback)
  })
}

testing.run(testFiveAsync, testing.show)

