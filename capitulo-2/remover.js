const fs = require('fs');

const remover = (arquivo) => {
  console.log('Excluindo download');
  fs.rmdir(arquivo);
};

module.exports = remover;