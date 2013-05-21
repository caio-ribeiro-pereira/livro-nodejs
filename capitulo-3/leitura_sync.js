var fs = require('fs');

var leituraSync = function(arquivo){
  console.log("Fazendo leitura síncrona");
  var inicio = new Date().getTime();
  fs.readFileSync(arquivo);
  var fim = new Date().getTime();
  console.log("Bloqueio síncrono: "+(fim - inicio)+ "ms");
};

module.exports = leituraSync;