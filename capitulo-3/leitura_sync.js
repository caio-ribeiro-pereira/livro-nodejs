const fs = require('fs');

const leituraSync = (arquivo) => {
  console.log('Fazendo leitura síncrona');
  console.time('Bloqueio síncrono');
  fs.readFileSync(arquivo);
  console.timeEnd('Bloqueio síncrono');
};

module.exports = leituraSync;