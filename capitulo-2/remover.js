var fs = require('fs');

var remover = function(arquivo){
  console.log("Excluindo download");
  fs.rmdir(arquivo);
};

module.exports = remover;