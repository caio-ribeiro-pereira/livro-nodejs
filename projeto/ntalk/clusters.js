var cluster = require('cluster')
  , os = require('os')
;
if (cluster.isMaster) {
  var cpus = os.cpus().length;
  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }
  cluster.on('listening', function(worker) {
    console.log("Cluster %d conectado", worker.process.pid);
  });
  cluster.on('disconnect', function(worker) {
    console.log('Cluster %d esta desconectado.', worker.process.pid);
  });
  cluster.on('exit', function(worker) {
    console.log('Cluster %d caiu fora.', worker.process.pid);
  });
} else {
  require('./app');
}