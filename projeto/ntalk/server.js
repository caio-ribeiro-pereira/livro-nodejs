var forever = require('forever-monitor');
var Monitor = forever.Monitor;

var child = new Monitor('clusters.js', {
  max: 10,
  silent: false,
  killTree: true,
  logFile: 'forever.log',
  outFile: 'app.log',
  errFile: 'error.log'
});

child.on('exit', function () {
  console.log('O server foi finalizado.');
});

child.start();