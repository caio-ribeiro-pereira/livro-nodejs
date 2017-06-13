const fs = require('fs');
const leituraSync = (arquivo) => {
  console.log('Fazendo leitura síncrona');
  const inicio = new Date().getTime();
  fs.readFileSync(arquivo);
  const fim = new Date().getTime();
  console.log(`Bloqueio síncrono: ${fim - inicio}ms`);
};
module.exports = leituraSync;