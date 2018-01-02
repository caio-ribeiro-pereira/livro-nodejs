const { Monitor } = require('forever-monitor');
const config = require('./config.js');

const child = new Monitor('clusters.js', config.forever);

child.on('exit', () => console.log('Servidor foi finalizado.'));

child.start();