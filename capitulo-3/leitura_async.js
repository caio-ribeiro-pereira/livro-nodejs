const fs = require('fs');

const leituraAsync = (arquivo) => {
  console.log('Fazendo leitura assíncrona');
  console.time('Bloqueio assíncrono');
  // Função callback vazia apenas para testar bloqueio assíncrono
  fs.readFile(arquivo, () => {});
  console.timeEnd('Bloqueio assíncrono');
};

module.exports = leituraAsync;