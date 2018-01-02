const cluster = require('cluster');
const cpus = require('os').cpus();

if (cluster.isMaster) {
  cpus.forEach(() => cluster.fork());
  cluster.on('listening', (worker) => {
    console.log(`Cluster ${worker.process.pid} conectado`);
  });
  cluster.on('disconnect', (worker) => {
    console.log(`Cluster ${worker.process.pid} desconectado`);
  });
  cluster.on('exit', (worker) => {
    console.log(`Cluster ${worker.process.pid} finalizado`);
  });
} else {
  require('./app');
}