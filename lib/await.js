'use strict'

const https = require('https')

const url = 'https://raw.githubusercontent.com/alexfernandez/curso-devacademy/master/async/account-0$.json'

const task = async () => {
	let total = 0
	for (let i = 1; i <= 5; i++) {
		total += await getData(url.replace('$', i))
	}
	return total
}
task()
	.then(value => console.log('total ' + value))
	.catch(error => console.error(`Could not get data: ${error}`))


function getData(url) {
	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
			if (res.statusCode !== 200) {
				return reject(`Invalid status code ${res.statusCode}`);
			}
			let rawData = '';
			res.on('data', (chunk) => rawData += chunk);
			res.on('end', () => resolve(JSON.parse(rawData).Debt));
		}).on('error', (e) => {
			return reject(`Got error: ${e.message}`);
		});
	})
}
